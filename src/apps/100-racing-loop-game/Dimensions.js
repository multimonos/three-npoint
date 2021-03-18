import * as t from "three"
import * as Window from "../../lib/Window";

export const create = () => {
    const trackWidth = 45
    const radius = 225 //center radius
    const innerRadius = radius - trackWidth
    const outerRadius = radius + trackWidth
    const size = 960
    const majorArcAngle = 1 / 3 * Math.PI //const
    const minorArcAngle = calculateMinorArcAngle( majorArcAngle, innerRadius, outerRadius )
    const right = calculateArcCenterOffset( minorArcAngle, majorArcAngle, innerRadius, outerRadius )
    const left = right.clone().multiplyScalar( -1 )

    const dim = {
        width: size,
        height: size * 2 / Window.aspectRatio(),
        track: {
            radius,
            offset: {
                left,
                right,
            },
            inner: { // 2 arcs
                radius: innerRadius,
                majorArcAngle,
                minorArcAngle,
            },
            outer: { // 1 arc
                radius: outerRadius,
                arcAngle: Math.acos( right.x / outerRadius )
            },
            island: { // 1 arc
                radius: innerRadius,
                arcAngle: Math.acos( right.x / innerRadius ),
            },
            field: {
                angle: Math.acos( right.x / outerRadius )
            }
        }
    }
    return dim
}

const calculateMinorArcAngle = ( majorArcAngle, innerRadius, outerRadius ) => {
    const dy = Math.sin( majorArcAngle ) * innerRadius
    const angle = Math.asin( dy / outerRadius )
    return angle
}

const calculateArcCenterOffset = ( minorAngle, majorAngle, innerRadius, outerRadius ) => {
    const center = new t.Vector2()

    center.x = 0.5 * (
        Math.cos( majorAngle ) * innerRadius
        + Math.cos( minorAngle ) * outerRadius
    )
    return center
}
