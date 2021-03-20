import * as t from "three";

export const createParticles = ( { count = 100 } ) => {
    const dim = 1000

    const vertices = createVertices( { count, width: dim } )
    const geo = createGeometry(vertices)
    const mat = createMaterial()
    const points = new t.Points( geo, mat )

    return points
}

const createGeometry = vertices => {
    const geo = new t.BufferGeometry()
    geo.setAttribute( 'position', new t.Float32BufferAttribute( vertices, 3 ) )
    return geo
}

const createMaterial = () =>
    new t.ParticleBasicMaterial( {
        color: 0xffffff,
        size: 3,
        sizeAttenuation: false,
        transparent: true,
        blend: t.AdditiveBlending,
    } )

const createVertices = ( { count = 10, width = 10 } ) => {
    const dx = width / count
    const half = count / 2
    const vertices = []

    for (let i = 0; i < count; i++) {
        const x = (i - half) * dx
        vertices.push( x, 0, 0 )
    }

    return vertices
}

export const moveParticlesDown = mesh => {
    const positions = mesh.geometry.attributes.position

    for (let i = 0; i < positions.count; i++) {
        let y = positions.getY( i ) - Math.random()
        positions.setY(i, y)
    }

    mesh.geometry.attributes.position.needsUpdate = true

    return mesh
}