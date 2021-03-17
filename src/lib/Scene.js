import { cond, equals, map, mapObjIndexed, pipe, type } from "ramda";

const isObject =
    pipe( type, equals( "Object" ) )

const isArray =
    pipe( type, equals( "Array" ) )

export const addLights = lights => scene =>
    cond( [
        [isArray, map( v => scene.add( v ) )],
        [isObject, mapObjIndexed( ( v, k, o ) => scene.add( v ) )],
    ] )( lights )

export const addMeshes = meshes => scene =>
    cond( [
        [isArray, map( v => scene.add( v ) )],
        [isObject, mapObjIndexed( ( v, k, o ) => scene.add( v ) )],
    ] )( meshes )
