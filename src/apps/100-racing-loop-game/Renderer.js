import * as t from "three";
import * as Window from "../../lib/Window";

export const create = () => {
    const renderer = new t.WebGLRenderer( { antialias: true } )
    renderer.setSize( Window.width(), Window.height() )
    return renderer
}