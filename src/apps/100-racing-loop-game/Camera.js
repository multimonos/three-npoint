import * as t from "three";

export const create = dim => {
    const width = dim.width
    const height = 0.5 * dim.height // so we don't run out of track to see
    const camera = new t.OrthographicCamera(
        width / -2, //left
        width / 2, //right
        height / 2, //top
        height / -2, //btm
        0,//near
        1000, // far
    )
    camera.position.set( 0, -210, 300 )
    camera.lookAt( 0, 0, 0 )

    return camera
}