import * as t from "three"
import * as Window from "../../lib/Window"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { set, assoc, identity, lens, pipe, prop } from "ramda";

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
        55,
        Window.aspectRatio(),
        2,
        1000,
    )
    camera.position.z = 50
    return camera
}

const createScene = () => {
    const scene = new t.Scene()
    scene.background = new t.Color( 0x000000 )
    scene.fog = new t.FogExp2( 0x000000, 0.0015 ) // soften all the edges
    return scene
}

const createRenderer = () => {
    const renderer = new t.WebGLRenderer()
    renderer.setSize( Window.width(), Window.height() )
    return renderer
}

const createLights = () => [] // no light required

const createVertices = () => {
    const vertices = [
        0, 0, 0, // a 1d array of triples
    ]
    return vertices
}

const createMeshes = () => {
    //vertices
    const vertices = createVertices()
    console.log( { vertices } )

    //geometry
    const geo = new t.BufferGeometry()
    geo.setAttribute( "position", new t.Float32BufferAttribute( vertices, 3 ) )
    console.log( { geo } )

    //material
    const mat = new t.PointsMaterial( {
        size: 5,
        sizeAttenuation: true, // point size changes as we zoom in
        alphaTest: 0.5,
        transparent: true
    } );
    mat.color.setHSL( 1.0, 0.3, 0.7 );
    console.log( { mat } )

    //mesh
    const pnts = new t.Points( geo, mat )
    console.log( { pnts } )

    return [
        pnts,
    ]
}

