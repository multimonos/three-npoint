import "./style.css"
import * as State from "./State"
import * as Scene from "./lib/Scene"
import * as Renderer from "./lib/Renderer"
import * as Window from "./lib/Window"

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

    const run = () => {
        const state = createState()
        setup( state )
        animate( state, null )
    }

    const animate = ( state, dt ) => {
        const nextState = State.next(state)
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
