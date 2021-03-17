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
        set( Lens.meshes, createPointCloud() ),
        set( Lens.lights, createLights() ),
    )( defaults )

    state = set( Lens.controls, createControls( state.camera, state.renderer ) )( state )

    return state
}

export const next = state =>
    pipe(
        identity
    )( state )

const createControls = ( camera, renderer ) => {
    const controls = new OrbitControls( camera, renderer.domElement )
    controls.minDistance = 1000;
    controls.maxDistance = 3000;
    return controls
}

const createCamera = () => {
    const camera = new t.PerspectiveCamera(
        45,
        Window.aspectRatio(),
        1,
        4000,
    )
    camera.position.z = 3000
    camera.position.x = 1000
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

const createLights = () => []

const createPoints = radius => count => {

    const randomPoint = r => ({
        x: Math.random() * r - r / 2,
        y: Math.random() * r - r / 2,
        z: Math.random() * r - r / 2,
    })

    const points = new Float32Array( count * 3 )

    for (let i = 0; i < count; i++) {
        const { x, y, z } = randomPoint( radius )
        const n = i * 3
        points[n] = x
        points[n + 1] = y
        points[n + 2] = z
    }

    return points
}

const createPointMaterial = () =>
    new t.PointsMaterial( {
        color: 0xffffff,
        size: 2,
        blending: t.AdditiveBlending,
        transparent: true,
        sizeAttenuation: false,
    } )

const createPointCloud = () => {
    const radius = 800
    const count = 1000

    const pnts = createPoints( radius )( count )
    const mat = createPointMaterial()

    const particles = new t.BufferGeometry()
    particles.setAttribute( 'position', new t.BufferAttribute( pnts, 3 ) )

    const cloud = new t.Points( particles, mat )

    const cloudBoundingBox = new t.BoxHelper( cloud, 0xffff00 )

    return [
        cloud,
        cloudBoundingBox,
    ]
}

