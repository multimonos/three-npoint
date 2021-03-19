import { Logger } from "./Logger"
import * as t from "three"

const logger = Logger()

export const zonesFor = hitDistance => agent => {
    const directionAngle = agent.angle + agent.direction * 0.5 * Math.Pi
    logger.log( hitDistance,agent )
    return new t.Vector2(

        // agent.m
    )

    return []
}

export const detect = dist => agent => objects => {

    return false
}

const dist = a => b =>
    Math.sqrt(
        (b.x - a.x) ** 2
        + (b.y - a.y) ** 2
    )

