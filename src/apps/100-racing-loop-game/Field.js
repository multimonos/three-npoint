import * as t from "three"

export const create = dim => {


    const geo = new t.ExtrudeBufferGeometry( [
        createLeftIsland( dim ),
        createRightIsland( dim ),
        createMiddleIsland( dim ),
        createField( dim ),
    ], {
        depth: 6,
        bevelEnabled: false
    } )

    const mat = [
        new t.MeshLambertMaterial( { color: 0x67c240 } ),
        new t.MeshLambertMaterial( { color: 0x23311c } ),
    ]

    const mesh = new t.Mesh( geo, mat )

    return mesh
}


const createLeftIsland = dim => {
    const shape = new t.Shape()

    shape.absarc(
        dim.track.offset.left.x,
        0,
        dim.track.inner.radius,
        dim.track.inner.majorArcAngle,
        -dim.track.inner.majorArcAngle,
        false
    );

    shape.absarc(
        dim.track.offset.right.x,
        0,
        dim.track.outer.radius,
        Math.PI + dim.track.inner.minorArcAngle,
        Math.PI - dim.track.inner.minorArcAngle,
        true,
    )

    return shape
}


const createRightIsland = dim => {
    const shape = new t.Shape()

    shape.absarc(
        dim.track.offset.right.x,
        0,
        dim.track.inner.radius,
        Math.PI - dim.track.inner.majorArcAngle,
        Math.PI + dim.track.inner.majorArcAngle,
        true
    );

    shape.absarc(
        dim.track.offset.left.x,
        0,
        dim.track.outer.radius,
        -dim.track.inner.minorArcAngle,
        dim.track.inner.minorArcAngle,
        false,
    )

    return shape
}

const createMiddleIsland = dim => {
    const shape = new t.Shape()

    shape.absarc(
        dim.track.offset.left.x,
        0,
        dim.track.island.radius,
        dim.track.island.arcAngle,
        -dim.track.island.arcAngle,
        true
    );

    shape.absarc(
        dim.track.offset.right.x,
        0,
        dim.track.island.radius,
        Math.PI + dim.track.island.arcAngle,
        Math.PI - dim.track.island.arcAngle,
        true
    );

    return shape
}

const createField = dim => {
    const shape = new t.Shape() //center of object is physical center...no absolute ref
    const halfWidth = dim.width / 2
    const halfHeight = dim.height / 2


    //field
    shape.moveTo( -halfWidth, -halfHeight )
    shape.lineTo( 0, -halfHeight )

    //left track
    shape.absarc(
        dim.track.offset.left.x,
        0,
        dim.track.outer.radius,
        -dim.track.field.angle,
        dim.track.field.angle,
        true,
    )

    shape.absarc(
        dim.track.offset.right.x,
        0,
        dim.track.outer.radius,
        Math.PI - dim.track.field.angle,
        Math.PI + dim.track.field.angle,
        true,
    )

    //trace the box
    shape.lineTo( 0, -halfHeight )
    shape.lineTo( halfWidth, -halfHeight )
    shape.lineTo( halfWidth, halfHeight )
    shape.lineTo( -halfWidth, halfHeight )


    return shape
}