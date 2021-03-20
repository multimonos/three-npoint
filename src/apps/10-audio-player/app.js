import "./style.css"
import * as t from "three"
import * as State from "./lib/State"
import * as Scene from "./lib/core/Scene"
import * as Renderer from "./lib/core/Renderer"
import * as Window from "./lib/core/Window"
import * as Audio from "./lib/Audio"

export const App = () => {

    const createState = () =>
        State.create()


    const setup = state => {
        Scene.add( state.meshes )( state.scene )
        Scene.add( state.lights )( state.scene )
        Renderer.addToDom( state.renderer )
        Window.addResizeHandler( state.renderer )( state.camera )
        ///
        state.audio.player = Audio.createAudio()
        state.audio.analyzer = new t.AudioAnalyser(state.audio.player, state.audio.bins)
        ///


        console.log( { state } )

        return state
    }

    const run = () => {
        const state = createState()
        setup( state )
        animate( state, null )
    }

    const animate = ( state, dt ) => {
        const nextState = State.next( state )
        requestAnimationFrame( animate.bind( null, nextState ) )
        nextState.renderer.render( nextState.scene, nextState.camera )
    }

    return {
        run,
    }
}


Window.addEvent( "load" )( () => {
    console.log( 'ohai ;)' )
    const app = App()
    app.run()
} )
