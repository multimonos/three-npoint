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
        2000,
    )
    camera.position.z = 100
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

const createLights = () => {
    const directional = new t.DirectionalLight( 0xffffff )
    directional.position.set( 0, 20, 10 )

    const ambient = new t.AmbientLight( 0x707070 )

    return [
        directional,
        ambient,
    ]
}

const createVertices = () => {
    const vertices = []

    for (let i = 0; i < 1000; i++) {

        const x = 2000 * Math.random() - 1000;
        const y = 2000 * Math.random() - 1000;
        const z = 2000 * Math.random() - 1000;

        // a 1d array of triples
        vertices.push( x, y, z );
    }

    return vertices
}

const createMeshes = () => {

    const vertices = createVertices()
    console.log({vertices})

    const geo = new t.BufferGeometry()
    geo.setAttribute( "position", new t.Float32BufferAttribute( vertices, 3 ) )

    const mat = new t.PointsMaterial( {
        size: 10,
        sizeAttenuation: true, // point sizes do not change as we zoom in
        alphaTest: 0.5,
        transparent: true
    } );
    mat.color.setHSL( 1.0, 0.3, 0.7 );

    const pnts = new t.Points( geo, mat )

    return [
        pnts,
    ]
}

