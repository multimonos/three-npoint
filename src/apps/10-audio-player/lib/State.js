import * as Camera from "./core/Camera"
import * as Controls from "./core/OrbitControls"
import * as Lights from "./core/Lights"
import * as Renderer from "./core/Renderer"
import * as Scene from "./core/Scene"
import * as Timer from "./core/Timer";
import * as t from "three"
import { flatten, identity, pipe } from "ramda";

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
        //...custom objects @see ./lib/Agent.js
        meshes: createVisualizer(),
        audio: {
            bins: 128,
            loaded: false,
            player: null,
            analyzer: null,
            averageFreq: null,
            freq: null,
        }
    }

    return state
}

export const next = state => pipe(
    identity,
    Timer.next,
    // updateAverageFrequencyData,
    // logAverageFrequencyData,
    updateFrequencyData,
    // logFrequencyData,
)( state )


function createVertices() {
    const matrix = []

    for (let i = 0; i < 128; i++) {
        matrix.push( [i - 128 / 2, 0, 0] )
    }

    const vertices = flatten( matrix )

    console.log( { vertices } )

    return vertices;
}

const createVisualizer = () => { // meshes that are either static or independent

    const geo = new t.BoxGeometry()
    const mat = new t.MeshPhongMaterial( { color: 0x00aaff } )
    const box = new t.Mesh( geo, mat )

    return {
        box,
    }

}

const updateAverageFrequencyData = state => {
    state.audio.averageFreq = state.audio.analyzer.getAverageFrequency()
    return state
}

const logAverageFrequencyData = state => {
    console.log( { averageFreq: state.audio.averageFreq } )
    return state
}


const updateFrequencyData = state => {
    state.audio.freq = state.audio.analyzer.getFrequencyData()
    return state
}

const logFrequencyData = state => {
    console.log( { freq: state.audio.freq } )
    return state
}

