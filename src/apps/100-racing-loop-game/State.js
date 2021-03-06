import { assoc, flatten, ifElse, lensPath, pipe, set } from "ramda";
import * as Hit from "./Hit"
import * as Dimensions from "./Dimensions"
import * as Ground from "./Ground"
import * as Field from "./Field"
import * as Scene from "./Scene"
import * as Camera from "./Camera"
import * as Renderer from "./Renderer";
import * as Timer from "./Timer";
import * as Lights from "./Lights";
import * as Controls from "./OrbitControls";
import * as Player from "./Player";
import * as Traffic from "./Traffic";

export const create = ( defaults = {} ) => {

    const dim = Dimensions.create()
    const camera = Camera.create( dim );
    const renderer = Renderer.create()

    let state = {
        //common
        dim,
        camera,
        scene: Scene.create(),
        renderer,
        controls: Controls.create( camera, renderer ),
        lights: Lights.create(),
        meshes: createWorld( dim ),
        timer: Timer.create(),
        //custom props
        game: createGameState(),
        enabled: true,
        traffic: Traffic.create(),
        player: Player.create(),
    }

    state = addMeshes( state.traffic )( state )
    state = addMeshes( [state.player] )( state )

    return state
}

const isGameOver = state => {
    return state.game.started
        && state.game.hit
}

export const next = state => pipe(
    nextTimer,
    detectCollisions,
    ifElse(
        isGameOver,
        resetGame,
        pipe(
            movePlayer,
            moveTraffic,
        )
    ),
    set(lensPath(['game','started']), true)
)( state )

const nextTimer = state =>
    assoc( "timer", Timer.next( state.timer ), state )

const resetGame = state => {
    console.log( 'game over' )
    return state
}

const addMeshes = objs => state => {
    objs.map( obj => {
        state.meshes[obj.id] = obj.mesh
    } )
    return state
}

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

const detectCollisions = state => {
    const playerZones = Hit.zonesFor( state.player )
    const machineZones = flatten( state.traffic.map( Hit.zonesFor ) )
    state.game.hit = Hit.detect( state.game.hitRadius )( machineZones )( playerZones )
    return state
}

const movePlayer = state => {
    const agent = state.player
    return moveAgent( state.player )( state )
}

const moveTraffic = state => {
    state.traffic.map( agent => {
        moveAgent( agent )( state )
    } )

    return state
}

const moveAgent = agent => state => {
    agent.angle = agent.angle
        + (agent.direction * agent.speed * state.timer.delta)

    agent.mesh.position.x = Math.cos( agent.angle )
        * state.dim.track.radius
        + state.dim.track.offset[agent.track].x

    agent.mesh.position.y = Math.sin( agent.angle )
        * state.dim.track.radius

    agent.mesh.rotation.z = agent.angle
        + (0.5 * Math.PI * agent.direction)

    return state
}

const createWorld = dim => ({
    ground: Ground.create( dim ),
    field: Field.create( dim ),
})

const createGameState = () => ({
    isReady: true,
    hitRadius: 15,
    hit: false,
    started: false,
})