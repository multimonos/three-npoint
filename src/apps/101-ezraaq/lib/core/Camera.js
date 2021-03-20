import { PerspectiveCamera } from "three";
import { aspectRatio } from "./Window";

export const create = () => {

    const camera = new PerspectiveCamera(
        75,
        aspectRatio(),
        0.1,
        5000,
    )

    camera.position.z = 1200
    camera.position.x = 0
    camera.position.y = 30

    return camera
}