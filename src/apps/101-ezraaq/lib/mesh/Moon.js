import * as t from "three"
import { Palette } from "../Palette";

export const create = () => {
    const geo = new t.SphereGeometry( 200, 32, 32 )
    const mat = new t.MeshLambertMaterial( { color: Palette.moon.body } )
    const mesh = new t.Mesh( geo, mat )

    mesh.position.y = -650
    mesh.position.z = -450
    mesh.position.x = 600

    return mesh
}
