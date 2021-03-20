import { AmbientLight, DirectionalLight } from "three";

export const create = () => {

    const directional = new DirectionalLight( 0xffffff )
    directional.position.set( 0, 20, 10 )

    const ambient = new AmbientLight( 0x707070 )

    return {
        directional,
        ambient,
    }
}