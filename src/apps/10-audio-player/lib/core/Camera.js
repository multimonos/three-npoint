import { PerspectiveCamera } from "three";
import { aspectRatio } from "./Window";

export const create = () => {

    const camera = new PerspectiveCamera(
        75,
        aspectRatio(),
        0.1,
        1000,
    )

    camera.position.z = 60
    camera.position.x = 0
    camera.position.y =20

    return camera
}