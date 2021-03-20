import * as t from "three"
import { Palette } from "../Palette";

export const create = () => {
    const geo = new t.SphereGeometry( 500, 32, 32 )
    const mat = new t.MeshLambertMaterial( { color: Palette.planet.body } )
    const mesh = new t.Points( geo, mat )

    mesh.position.y = 650
    mesh.position.z = -1500
    mesh.position.x = -400

    return mesh
}
