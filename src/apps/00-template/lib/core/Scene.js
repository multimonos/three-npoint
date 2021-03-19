import { Scene, Color } from "three";
import { cond, equals, map, mapObjIndexed, pipe, type } from "ramda";

export const create = () => {
    const scene = new Scene()
    scene.background = new Color( 0x000000 )
    return scene
}

export const isObject =
    pipe( type, equals( "Object" ) )

export const isArray =
    pipe( type, equals( "Array" ) )

export const add = objects => scene =>
    cond( [
        [isArray, map( v => scene.add( v ) )],
        [isObject, mapObjIndexed( ( v, k, o ) => scene.add( v ) )],
    ] )( objects )
