import { cond, map, mapObjIndexed } from "ramda";
import { isArray, isObject } from "./Util";

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
