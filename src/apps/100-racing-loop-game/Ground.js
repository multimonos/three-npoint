import * as t from "three";

export const create = dim => {

    const texture = createTexture( dim )

    const plane = new t.Mesh(
        new t.PlaneBufferGeometry(
            dim.width,
            dim.height
        ),
        new t.MeshLambertMaterial( {
            map: texture
        } )
    )

    return plane
}

const createTexture = dim => {
    //NOTE: coords -> topleft = (0,0)
    const worldCenter = new t.Vector2( dim.width, dim.height ).multiplyScalar( 0.5 )

    const canvas = document.createElement( "canvas" )
    canvas.width = dim.width
    canvas.height = dim.height

    const ctx = canvas.getContext( "2d" )

    drawPlane(dim, ctx)
    drawInnerLineMarkings(dim, dim.track.offset.right, ctx)
    drawInnerLineMarkings(dim, dim.track.offset.left, ctx)

    return new t.CanvasTexture( canvas )
}

const drawPlane = (dim, ctx) => {
    ctx.fillStyle = "#546e90"
    ctx.fillRect( 0, 0, dim.width, dim.height )
}

const drawInnerLineMarkings = ( dim, position, ctx) => {
    const worldCenter = new t.Vector2( dim.width, dim.height ).multiplyScalar( 0.5 )

    //style
    ctx.lineWidth = 2
    ctx.strokeStyle = "#e0ffff"
    ctx.setLineDash( [10, 14] )

    // left arc
    ctx.beginPath()
    ctx.arc(
        worldCenter.x + position.x,
        worldCenter.y,
        dim.track.radius,
        0,
        2 * Math.PI
    )
    ctx.stroke()
}