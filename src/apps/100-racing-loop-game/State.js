import * as t from "three"
import * as Window from "../../lib/Window"
import * as Car from "./Car"
import * as Dimensions from "./Dimensions"
import * as Ground from "./Ground"
import * as Field from "./Field"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { assoc, lens, pipe, prop, set } from "ramda";

const Lens = {
    camera: lens( prop( "camera" ), assoc( "camera" ) ),
    controls: lens( prop( "controls" ), assoc( "controls" ) ),
    lights: lens( prop( "lights" ), assoc( "lights" ) ),
    meshes: lens( prop( "meshes" ), assoc( "meshes" ) ),
    renderer: lens( prop( "renderer" ), assoc( "renderer" ) ),
    scene: lens( prop( "scene" ), assoc( "scene" ) ),
    dim: lens( prop( "dim" ), assoc( "dim" ) ),
}

export const create = ( defaults = {} ) => {

    const dimensions = Dimensions.create()

    let state = pipe(
        set( Lens.dim, dimensions ),
        set( Lens.scene, createScene() ),
        set( Lens.camera, createCamera( dimensions ) ),
        set( Lens.renderer, createRenderer() ),
        set( Lens.lights, createLights() ),
        set( Lens.meshes, createMeshes( dimensions ) ),
    )( defaults )

    state = set( Lens.controls, createControls( state.camera, state.renderer ) )( state )

    return state
}

export const next = state => state


const createControls = ( camera, renderer ) =>
    new OrbitControls( camera, renderer.domElement )

const createCamera = dim => {
    const width = dim.width
    const height = 0.5 * dim.height // so we don't run out of track to see
    const camera = new t.OrthographicCamera(
        width / -2, //left
        width / 2, //right
        height / 2, //top
        height / -2, //btm
        0,//near
        1000, // far
    )
    camera.position.set( 0, 0, 300 )
    camera.lookAt( 0, 0, 0 )

    return camera
}

const createScene = () => {
    const scene = new t.Scene()
    scene.background = new t.Color( 0x000000 )
    return scene
}

const createRenderer = () => {
    const renderer = new t.WebGLRenderer( { antialias: true } )
    renderer.setSize( Window.width(), Window.height() )
    return renderer
}

const createLights = () => {
    const directional = new t.DirectionalLight( 0xffffff, 0.6 )
    directional.position.set( 100, -300, 400 )

    const ambient = new t.AmbientLight( 0xffffff, 0.6 )

    return [
        directional,
        ambient,
    ]
}

const createMeshes = dim => {
    const car = Car.create()
    const ground = Ground.create( dim )
    const field = Field.create( dim )
    // const racetrack = Track.create( track.width, track.height )
    return [
        car,
        ground,
        field,
        // track,
    ]
}


