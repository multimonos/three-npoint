import { pipe, type, equals, tap } from "ramda"

export const isObject =
    pipe( type, equals( "Object" ) )

export const isArray =
    pipe( type, equals( "Array" ) )

const trace = tap( console.log )

export const addEvent = name => target => callback =>
    target.addEventListener( name, callback )