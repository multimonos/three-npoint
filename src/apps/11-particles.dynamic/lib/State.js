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
    rotateParticleSystem,
)( state )

const createParticleSystem = ( { count = 100 } ) => {
    const dim = 500
    const position = domain => Math.random() * domain - 0.5 * domain

    const geo = new t.BufferGeometry()
    const mat = new t.ParticleBasicMaterial( {
        color: 0xffffff,
        size: 3,
        sizeAttenuation:false,
    } )

    const vertices = []
    for (let i = 0; i < count; i++) {
        vertices.push(
            position( dim ),
            position( dim ),
            position( dim ),
        )
    }

    geo.setAttribute( 'position', new t.Float32BufferAttribute( vertices, 3 ) )
    console.log( { geo } )
    console.log( { vertices } )

    const particles = new t.Points( geo, mat )
    return particles


}

const createWorld = () => { // meshes that are either static or independent
    const geo = new t.BoxGeometry()
    const mat = new t.MeshPhongMaterial( { color: 0x00aaff } )
    const box = new t.Mesh( geo, mat )

    const particles = createParticleSystem( { count: 200 } )

    return {
        box,
        particles,
    }
}

const rotateParticleSystem = state => {
    state.meshes.particles.rotation.z += state.timer.delta * .1
    state.meshes.particles.rotation.x += state.timer.delta * .5
    return state
}