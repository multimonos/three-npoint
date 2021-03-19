import * as Camera from "./core/Camera"
import * as Controls from "./core/OrbitControls"
import * as Lights from "./core/Lights"
import * as Renderer from "./core/Renderer"
import * as Scene from "./core/Scene"
import * as Timer from "./core/Timer";
import * as Platform from "./geo/Platform"
import { identity, pipe } from "ramda";

export const create = () => {

    const scene = Scene.create(0xcdcdcd)
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
)( state )


const createWorld = () => { // meshes that are either static or independent
    const platform = Platform.create()

    return {
        platform,
    }
}

