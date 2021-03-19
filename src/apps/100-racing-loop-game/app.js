import "../../style.css"
import * as State from "./State"
import * as Scene from "../../lib/Scene"
import * as Renderer from "../../lib/Renderer"
import * as Window from "../../lib/Window"
import { addEvent } from "../../lib/Util";

export const App = () => {

    const createState = () => State.create()

    const setup = state => {
        Scene.add( state.meshes )( state.scene )
        Scene.add( state.lights )( state.scene )
        Renderer.addToDom( state.renderer )
        Window.addResizeHandler( state.renderer )( state.camera )
        Window.addEvent( "keydown" )( State.handleKeydown.bind( null, state ) )

        console.log( { state } )

        return state
    }

    const run = () => {
        const state = createState()
        setup( state )
        animate( state, null )
    }

    const animate = ( state, dt ) => {
        const nextState = State.next(state)

        requestAnimationFrame( animate.bind( null, nextState ) )

        nextState.renderer.render( state.scene, state.camera )
    }

    return {
        run,
    }
}

addEvent( "load" )( window )( () => {
    const app = App()
    app.run()
} )
