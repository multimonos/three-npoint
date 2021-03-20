import * as Camera from "./core/Camera"
import * as Controls from "./core/OrbitControls"
import * as Lights from "./core/Lights"
import * as Renderer from "./core/Renderer"
import * as Scene from "./core/Scene"
import * as Timer from "./core/Timer";
import * as t from "three"
import { identity, once, pipe } from "ramda";
import * as ParticleSystem from "./Particles";

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
        meshes: createWorld(),
    }

    return state
}

export const next = state => pipe(
    identity,
    Timer.next,
    moveParticlesDown,
)( state )


const log = once( console.log )

const createWorld = () => { // meshes that are either static or independent
    const geo = new t.BoxGeometry(30,30,30)
    const mat = new t.MeshPhongMaterial( { color: 0x00aaff } )
    const box = new t.Mesh( geo, mat )

    const particles = ParticleSystem.createParticles( { count: 100 } )

    return {
        box,
        particles,
    }
}

const moveParticlesDown = state => {
    ParticleSystem.moveParticlesDown(state.meshes.particles)
    return state

    const positions = state.meshes.particles.geometry.attributes.position
    for (let i = 0; i < positions.count; i++) {
        let y = positions.getY( i ) - Math.random()
        positions.setY(i, y)


    }

    state.meshes.particles.geometry.attributes.position.needsUpdate = true

    return state
}