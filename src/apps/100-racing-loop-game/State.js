import * as t from "three"
import * as Window from "../../lib/Window"
import * as Car from "./Car"
import * as Hit from "./Hit"
import * as Dimensions from "./Dimensions"
import * as Ground from "./Ground"
import * as Field from "./Field"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { assoc, identity, lens, pipe, prop, set } from "ramda";

const Lens = { // not sure this is all worth the complexity for this type of project
    camera: lens( prop( "camera" ), assoc( "camera" ) ),
    controls: lens( prop( "controls" ), assoc( "controls" ) ),
    lights: lens( prop( "lights" ), assoc( "lights" ) ),
    meshes: lens( prop( "meshes" ), assoc( "meshes" ) ),
    renderer: lens( prop( "renderer" ), assoc( "renderer" ) ),
    scene: lens( prop( "scene" ), assoc( "scene" ) ),
    dim: lens( prop( "dim" ), assoc( "dim" ) ),
    game: lens( prop( "game" ), assoc( "game" ) ),
}

export const create = ( defaults = {} ) => {

    const dimensions = Dimensions.create()

    let state = pipe(
        set( Lens.game, createGameState() ),
        set( Lens.dim, dimensions ),
        set( Lens.scene, createScene() ),
        set( Lens.camera, createCamera( dimensions ) ),
        set( Lens.renderer, createRenderer() ),
        set( Lens.lights, createLights() ),
        set( Lens.meshes, createWorld( dimensions ) ),
        assoc( "enabled", true ),
        assoc( "timer", createTimer() ),
        assoc( "traffic", [] ),
        assoc( "player", createPlayer() ),
    )( defaults )

    state.controls = createControls( state.camera, state.renderer )
    state.traffic = createTraffic( state )

    return state
}

export const next = state => pipe(
    identity,
    nextTimer,
    hitDetection,
    movePlayer,
    moveTraffic,
)( state )


export const handleKeydown = ( state, event ) => {
    if ( "arrowup" === event.key.toLowerCase() ) {
        state.player.speed += 0.1
    } else if ( "arrowdown" === event.key.toLowerCase() ) {
        state.player.speed -= 1
        state.player.speed > 0
            ? state.player.speed = state.player.speed
            : state.player.speed = 0
    }
}

const getMesh = id => state =>
    state.meshes[id]

const hitDetection = state => {
    const playerMesh = getMesh(state.player.meshId)
    const playerZones = Hit.zonesFor( state.game.hitRadius )( state.player )
    const machineZones = Hit.zonesFor( state.game.hitRadius )( state.traffic )
    state.hit = Hit.detect( playerZones, machineZones )
    return state
}

const createTimer = () => ({
    clock: new t.Clock(),
    delta: 0, // so everyone has the same delta
})

const nextTimer = state => {
    state.timer.delta = state.timer.clock.getDelta()
    return state
}

const createPlayer = () => ({
    meshId: "player",
    direction: -1,
    angle: 0,
    startAngle: Math.PI,
    speed: 1,
    score: 0, //@todo scoring
    laps: 0, //@todo lap counter
})

const movePlayer = state => {
    state.player.angle = state.player.angle
        + (state.player.direction * state.player.speed * state.timer.delta)

    state.meshes.player.position.x = Math.cos( state.player.angle )
        * state.dim.track.radius
        + state.dim.track.offset.left.x

    state.meshes.player.position.y = Math.sin( state.player.angle )
        * state.dim.track.radius

    state.meshes.player.rotation.z = state.player.angle
        + (0.5 * Math.PI * state.player.direction)

    return state
}

const createTraffic = state => {

    //@todo remove side-effects
    const cars = [
        Car.create(),
        Car.create(),
        Car.create(),
    ]

    const traffic = cars.map( ( car, k ) => {
        const id = `traffic${k}`

        state.meshes[id] = car

        return {
            meshId: id,
            mesh: car,
            direction: 1,
            angle: Math.random() * 2 * Math.PI,
            startAngle: Math.random() * 2 * Math.PI,
            speed: Math.random() * 2,
        }
    } )

    return traffic
}

const moveTraffic = state => {

    state.traffic.map( car => {
        const mesh = state.meshes[car.meshId]

        car.angle = car.angle
            + (car.direction * car.speed * state.timer.delta)

        mesh.position.x = Math.cos( car.angle )
            * state.dim.track.radius
            + state.dim.track.offset.right.x

        mesh.position.y = Math.sin( car.angle )
            * state.dim.track.radius

        mesh.rotation.z = car.angle
            + (0.5 * Math.PI * car.direction)

    } )

    return state
}

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
    camera.position.set( 0, -210, 300 )
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

const createWorld = dim => {
    const player = Car.create()
    const ground = Ground.create( dim )
    const field = Field.create( dim )

    const meshes = {
        player,
        ground,
        field,
    }

    return meshes
}


const createGameState = () => ({
    isReady: true,
    hitRadius: 15,
    hit: false,
})