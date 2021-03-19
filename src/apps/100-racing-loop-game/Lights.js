import * as t from "three";

export const create = () => {
    const directional = new t.DirectionalLight( 0xffffff, 0.6 )
    directional.position.set( 100, -300, 400 )

    const ambient = new t.AmbientLight( 0xffffff, 0.6 )

    return [
        directional,
        ambient,
    ]
}