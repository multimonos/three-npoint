import { width, height } from "./Window";
import { WebGLRenderer } from "three";

export const create = () => {

    const renderer = new WebGLRenderer()

    renderer.setSize( width(), height() )

    return renderer
}

export const addToDom = renderer =>
    document.body.appendChild( renderer.domElement )
