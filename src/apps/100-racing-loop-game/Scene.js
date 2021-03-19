import * as t from "three";

export const create = () => {
    const scene = new t.Scene()
    scene.background = new t.Color( 0x000000 )
    return scene
}