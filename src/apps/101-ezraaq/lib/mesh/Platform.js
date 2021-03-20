import * as t from "three";
import { Palette } from "../Palette";

export const create = () => {
    const grp = new t.Group()

    const radius = 250
    const meshes = [
        createTop( { radius, color: Palette.platform.red } ),
        createMiddle( { radius, color: Palette.platform.black } ),
        createBottom( { radius, color: Palette.platform.blue } ),
    ].map( mesh => grp.add( mesh ) )

    return grp
}

const createTop = ( { radius, color } ) => {
    const mat = new t.MeshPhongMaterial( { color } )
    const geo = new t.CylinderGeometry( radius, radius, 10, 32 )
    const mesh = new t.Mesh( geo, mat )
    mesh.position.y = 10
    return mesh
}

const createMiddle = ( { radius, color } ) => {
    const mat = new t.MeshPhongMaterial( { color } )
    const geo = new t.CylinderGeometry( radius, radius, 10, 32 )
    const mesh = new t.Mesh( geo, mat )
    return mesh
}

const createBottom = ( { radius, color } ) => {
    const mat = new t.MeshPhongMaterial( { color } )
    const geo = new t.CylinderGeometry( radius, radius, 10, 32 )
    const mesh = new t.Mesh( geo, mat )
    mesh.position.y = -10
    return mesh
}
