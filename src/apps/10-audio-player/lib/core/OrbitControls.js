import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export const create = ( camera, renderer ) =>
    new OrbitControls( camera, renderer.domElement )