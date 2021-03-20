import * as Camera from "./core/Camera"
import * as Controls from "./core/OrbitControls"
import * as Lights from "./core/Lights"
import * as Renderer from "./core/Renderer"
import * as Scene from "./core/Scene"
import * as Timer from "./core/Timer";
import * as t from "three"
import { identity, pipe } from "ramda";

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
    rotateBox,
)( state )


const createWorld = () => { // meshes that are either static or independent
    const geo = new t.BoxGeometry()
    const mat = new t.MeshPhongMaterial( { color: 0x00aaff } )
    const box = new t.Mesh( geo, mat )

    return {
        box,
    }
}

const rotateBox = state => {
    state.meshes.box.rotation.y += .5 * state.timer.delta
    state.meshes.box.rotation.z += .5 * state.timer.delta
    return state
}
