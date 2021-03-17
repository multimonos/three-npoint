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
    scene.fog = new t.Fog( 0x111111, 150, 200 )
    return scene
}

const createRenderer = () => {
    const renderer = new t.WebGLRenderer( { antialias: true } )
    renderer.setSize( Window.width(), Window.height() )
    return renderer
}

const createLights = () => []

const createPoints = ( yDelta = 0 ) => {
    const pnts = [
        new t.Vector3( -10, yDelta, 0 ), // a 1d array of triples
        new t.Vector3( 0, 10 + yDelta, 0 ),
        new t.Vector3( 10, yDelta, 0 ),
    ]
    return pnts
}

const createMeshes = () => {
    // solid
    const basicPoints = createPoints()
    const basicGeo = new t.BufferGeometry().setFromPoints( basicPoints )
    const basicMat = new t.LineBasicMaterial( {
        color: 0x3EB595,
        linewidth: 3,
        linecap: "round",
        linejoin: "round",
    } );
    const basicLine = new t.Line( basicGeo, basicMat )

    // dashed
    const dashedPoints = createPoints( 10 )
    const dashedGeo = new t.BufferGeometry().setFromPoints( dashedPoints )
    const dashedMat = new t.LineDashedMaterial( {
        color: 0xFFF447,
        linewidth: 2,
        dashSize: 3,
        gapSize: 1,
    } )
    const dashedLine = new t.Line( dashedGeo, dashedMat )

    // dashed - crucial
    dashedLine.computeLineDistances() // crucial

    //log
    console.log( { basicPoints } )
    console.log( { dashedPoints } )
    console.log( { basicGeo } )
    console.log( { basicMat } )
    console.log( { dashedMat } )

    return [
        basicLine,
        dashedLine
    ]
}

