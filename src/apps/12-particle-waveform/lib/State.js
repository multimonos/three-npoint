import * as Camera from "./core/Camera"
import * as Controls from "./core/OrbitControls"
import * as Lights from "./core/Lights"
import * as Renderer from "./core/Renderer"
import * as Scene from "./core/Scene"
import * as Timer from "./core/Timer";
import * as t from "three"
import { ifElse, pipe } from "ramda";
import * as ParticleSystem from "./Particles";
import * as Audio from "./Audio";
import * as dat from "dat.gui";

export const create = () => {

    const scene = Scene.create()
    const camera = Camera.create()
    const renderer = Renderer.create()
    const lights = Lights.create()
    const controls = Controls.create( camera, renderer )
    const timer = Timer.create()

    let state = {
        scene,
        camera,
        renderer,
        controls,
        lights,
        timer,
        //custom
        // mode: "frequency",
        mode: "waveform",
        gui: null,
        meshes: {
            particles: ParticleSystem.createParticles( { count: 100 } )
        },
        audio: {
            bins: 256,
            loaded: false,
            player: Audio.createAudio(),
            analyzer: null,
            samples: [],
            frequencies: [],
        }
    }

    state.audio.analyzer = new t.AudioAnalyser( state.audio.player, state.audio.bins )
    state.gui = createUI(state)
    return state
}

const isWaveformMode = state =>
    state.mode === "waveform"

export const next = state => pipe(
    Timer.next,
    ifElse(
        isWaveformMode,
        pipe(
            updateAudioSamples,
            updateParticlesWithAudioSamples,
        ),
        pipe(
            updateAudioFrequencies,
            updateParticlesWithAudioFrequencies
        ),
    ),
)( state )


const updateAudioFrequencies = state => {
    state.audio.frequencies = state.audio.analyzer.getFrequencyData()
    return state
}

const updateAudioSamples = state => {
    state.audio.samples = Audio.getWaveformData( state.audio.analyzer )
    return state
}

const updateParticlesWithAudioSamples = state => {
    const data = state.audio.samples
    const scale = 500

    const mesh = state.meshes.particles
    const positions = mesh.geometry.attributes.position

    for (let i = 0; i < data.length; i++) {
        positions.setY( i, data[i] * scale )
    }

    mesh.geometry.attributes.position.needsUpdate = true

    return state
}

const updateParticlesWithAudioFrequencies = state => {
    const data = state.audio.frequencies
    const scale = 1

    const mesh = state.meshes.particles
    const positions = mesh.geometry.attributes.position

    for (let i = 0; i < data.length; i++) {
        positions.setY( i, data[i] * scale )
    }

    mesh.geometry.attributes.position.needsUpdate = true

    return state
}

const createUI = state => {
    const ui = new dat.GUI()
    ui.add(state, "mode", ["waveform", "frequency"]).name("Mode")
    return ui
}