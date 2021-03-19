export const create = ( {
    id = null,
    mesh = null,
    track = "right",
    direction = 1,
    angle = 0,
    startAngle = 0,
    speed = 1
} ) => ({
    id,
    mesh,
    track,
    direction,
    angle,
    startAngle,
    speed,
})