import * as t from "three"
import * as Window from "../../lib/Window"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { set, assoc, identity, lens, pipe, prop, view, tap } from "ramda";

const trace = tap( console.log )

const Lens = {
    camera: lens( prop( "camera" ), assoc( "camera" ) ),
    controls: lens( prop( "controls" ), assoc( "controls" ) ),
    lights: lens( prop( "lights" ), assoc( "lights" ) ),
    meshes: lens( prop( "meshes" ), assoc( "meshes" ) ),
    renderer: lens( prop( "renderer" ), assoc( "renderer" ) ),
    scene: lens( prop( "scene" ), assoc( "scene" ) ),
}

export const create = ( defaults = {} ) => {
    let state = pipe(
        set( Lens.scene, createScene() ),
        set( Lens.camera, createCamera() ),
        set( Lens.renderer, createRenderer() ),
        set( Lens.meshes, createMeshes() ),
        set( Lens.lights, createLights() ),
    )( defaults )

    state = set( Lens.controls, createControls( state.camera, state.renderer ) )( state )

    return state
}

export const next = state =>
    pipe(
        identity
    )( state )

const createControls = ( camera, renderer ) =>
    new OrbitControls( camera, renderer.domElement )

const createCamera = () => {
    const camera = new t.PerspectiveCamera(
        75,
        Window.aspectRatio(),
        0.1,
        1000,
    )
    camera.position.z = 3
    return camera
}

const createScene = () => {
    const scene = new t.Scene()
    scene.background = new t.Color( 0x000000 )
    return scene
}

const createRenderer = () => {
    const renderer = new t.WebGLRenderer()
    renderer.setSize( Window.width(), Window.height() )
    return renderer
}

const createLights = () => {
    const directional = new t.DirectionalLight( 0xffffff )
    directional.position.set( 0, 20, 10 )

    const ambient = new t.AmbientLight( 0x707070 )

    return [
        directional,
        ambient,
    ]
}

const createMeshes = () => {
    const geo = new t.BoxGeometry()
    const mat = new t.MeshPhongMaterial( { color: 0x00aaff } )
    const box = new t.Mesh( geo, mat )
    return [
        box,
    ]
}

