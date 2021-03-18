import * as t from "three"

export const create = () => {

    const colors = [0xa52523, 0xbdb638, 0x78b14b]
    const bodyColor = pickRandom( colors )
    const car = new t.Group()

    const meshes = [
        createWheel( { x: -18, y: 0, z: 6 } ), //rear
        createWheel( { x: 18, y: 0, z: 6 } ), //front
        createBody( bodyColor ),
        createCabin(),
    ]

    meshes.map( mesh => car.add( mesh ) )

    return car
}

const createWheel = ( { x, y, z } ) => {
    const wheel = new t.Mesh(
        new t.BoxBufferGeometry( 12, 33, 12 ),
        new t.MeshLambertMaterial( { color: 0x333333 } )
    )
    wheel.position.z = z
    wheel.position.x = x
    return wheel
}

const createBody = color => {
    const body = new t.Mesh(
        new t.BoxBufferGeometry( 60, 30, 15 ),
        new t.MeshLambertMaterial( { color } )
    )
    body.position.z = 12
    return body
}

const createCabin = () => {
    const texture = {
        front: createCarFrontTexture(),
        back: createCarFrontTexture(),
        right: createCarSideTexture(),
        left: createCarSideTexture(),
    }

    //adjust position of textures
    texture.front.center = new t.Vector2( 0.5, 0.5 )
    texture.front.rotation = .5 * Math.PI

    texture.back.center = new t.Vector2( .5, .5 )
    texture.back.rotation = -.5 * Math.PI

    texture.left.flipY = false

    // create mesh
    const cabin = new t.Mesh(
        new t.BoxBufferGeometry( 33, 24, 12 ), [
            new t.MeshLambertMaterial( { map: texture.front } ),
            new t.MeshLambertMaterial( { map: texture.back } ),
            new t.MeshLambertMaterial( { map: texture.left } ),
            new t.MeshLambertMaterial( { map: texture.right } ),
            new t.MeshLambertMaterial( { color: 0xffffff } ), //top
            new t.MeshLambertMaterial( { color: 0xffffff } ), //btm
        ]
    )

    //adjust placement
    cabin.position.x = -6
    cabin.position.z = 25.5

    return cabin
}

const pickRandom = colors => colors[Math.floor( Math.random() * colors.length )]

const createCarFrontTexture = () => {
    const canvas = document.createElement( "canvas" )
    canvas.width = 64
    canvas.height = 32

    const ctx = canvas.getContext( "2d" )

    ctx.fillStyle = "#ffffff"
    ctx.fillRect( 0, 0, 64, 32 )

    ctx.fillStyle = "#666666"
    ctx.fillRect( 8, 8, 48, 24 )

    const texture = new t.CanvasTexture( canvas )


    return texture
}

const createCarSideTexture = () => {
    const canvas = document.createElement( "canvas" )
    canvas.width = 128
    canvas.height = 32

    const ctx = canvas.getContext( "2d" )

    ctx.fillStyle = "#ffffff"
    ctx.fillRect( 0, 0, 128, 32 )

    ctx.fillStyle = "#666666"
    ctx.fillRect( 10, 8, 38, 24 )
    ctx.fillRect( 58, 8, 60, 24 )

    return new t.CanvasTexture( canvas )
}
