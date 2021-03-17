import "../../style.css"
import * as State from "./State"
import * as Scene from "../../lib/Scene"
import * as Renderer from "../../lib/Renderer"
import * as Window from "../../lib/Window"
import { addEvent } from "../../lib/Util";
import { head, pipe } from "ramda";

export const App = () => {

    const createState = () => State.create()

    const setup = state => {
        Scene.add( state.meshes )( state.scene )
        Scene.add( state.lights )( state.scene )
        Renderer.addToDom( state.renderer )
        Window.addResizeHandler( state.renderer )( state.camera )

        console.log( { state } )

        return state
    }

    const update = state => state

    const run = () => {
        const state = createState()
        setup( state )
        animate( state )
    }

    const animate = state => {
        const nextState = pipe(
            State.next,
            update,
        )( state )

        requestAnimationFrame( () => animate( nextState ) )

        nextState.renderer.render( state.scene, state.camera )
    }

    return {
        run,
    }
}

addEvent( "load" )( window )( () => {
    console.log( 'ohai ;)' )
    const app = App()
    app.run()
} )
