import * as t from "three";

export const createParticles = ( { count = 100, width = 1000 } ) => {
    const vertices = createVertices( { count, width } )
    const geo = createGeometry( vertices )
    const mat = createMaterial()

    return new t.Points( geo, mat )
}

const createGeometry = vertices =>
    new t.BufferGeometry()
        .setAttribute( 'position', new t.Float32BufferAttribute( vertices, 3 ) )

const createMaterial = () =>
    new t.ParticleBasicMaterial( {
        color: 0xffffff,
        size: 2,
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
        const y = 0
        vertices.push(
            x,
            y,
            0
        )
    }

    return vertices
}

export const moveParticlesDown = ( mesh, delta ) => {
    const positions = mesh.geometry.attributes.position
    const speed = -50

    for (let i = 0; i < positions.count; i++) {
        let y = positions.getY( i )
            + speed * delta * Math.random()
        positions.setY( i, y )
    }

    mesh.geometry.attributes.position.needsUpdate = true

    return mesh
}