import { AmbientLight, DirectionalLight } from "three";

export const create = () => {

    const directional = new DirectionalLight( 0xffdb59 )
    directional.position.set( 100, 80, -60 )

    const ambient = new AmbientLight( 0x666666)

    return {
        directional,
        // ambient,
    }
}