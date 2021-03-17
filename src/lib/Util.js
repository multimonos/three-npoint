import { pipe, type, equals } from "ramda"

export const isObject =
    pipe( type, equals( "Object" ) )

export const isArray =
    pipe( type, equals( "Array" ) )

export const addEvent = name => target => callback =>
    target.addEventListener( name, callback )