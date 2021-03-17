import * as State from "./State"
import * as Scene from "../../lib/Scene"
import * as Renderer from "../../lib/Renderer"
import * as Window from "../../lib/Window"
import { addEvent } from "../../lib/Util";
import { head, pipe } from "ramda";

export const App = () => {

    const setup = () => {
        const state = State.create()

        Scene.addMeshes( state.meshes )( state.scene )
        Scene.addLights( state.lights )( state.scene )
        Renderer.addToDom( state.renderer )
        Window.addResizeHandler( state.renderer )( state.camera )

        console.log( { state } )

        return state
    }

    const update = state => {
        return state
    }

    const run = () => {
        const state = setup()
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
