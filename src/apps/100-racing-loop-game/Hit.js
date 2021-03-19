import { Logger } from "./Logger"
import * as t from "three"
import { flatten } from "ramda";

const logger = Logger()

export const zonesFor = agent => {
    const offset = 15
    const directionAngle = agent.angle + (agent.direction * 0.5 * Math.PI)

    const zones = [
        new t.Vector2(
            agent.mesh.position.x + Math.cos( directionAngle ) * offset,
            agent.mesh.position.y + Math.sin( directionAngle ) * offset,
        ),
        new t.Vector2(
            agent.mesh.position.x + Math.cos( directionAngle ) * -1 * offset,
            agent.mesh.position.y + Math.sin( directionAngle ) * -1 * offset,
        ),
    ]
    return zones
}


const distanceBetween = a => b =>
    Math.sqrt( (b.x - a.x) ** 2 + (b.y - a.y) ** 2 )

export const detect = hitDistance => targets => agents => {
    return targets.some( target => {
        return agents.some( agent => {
            if ( distanceBetween( target )( agent ) < hitDistance ) {
                return true
            }
        } )
    } )
}

