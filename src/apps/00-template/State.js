import * as Camera from "./lib/Camera"
import * as Controls from "./lib/OrbitControls"
import * as Lights from "./lib/Lights"
import * as Renderer from "./lib/Renderer"
import * as Scene from "./lib/Scene"
import * as Timer from "./lib/Timer";
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
        meshes: createMeshes(),
    }

    return state
}

export const next = state => pipe(
    identity,
    Timer.next,
    rotateBox,
)( state )


const createMeshes = () => {
    const geo = new t.BoxGeometry()
    const mat = new t.MeshLambertMaterial( { color: 0x00aaff } )
    const box = new t.Mesh( geo, mat )

    return {
        box,
    }
}

const rotateBox = state => {
    state.meshes.box.rotation.y += 0.01
    state.meshes.box.rotation.z += 0.01
    return state
}
