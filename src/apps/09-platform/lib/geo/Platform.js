import * as t from "three";
import { Palette } from "../Palette";

export const create = () => {
    const meshes = [
        createTop( { color: Palette.platform.red } ),
        createMiddle( { color: Palette.platform.black } ),
        createBottom( { color: Palette.platform.blue } ),
    ]

    const grp = new t.Group()

    meshes.map( mesh=>grp.add(mesh) )

    return grp
}

const createMiddle = ( { color } ) => {
    const mat = new t.MeshPhongMaterial( { color } )
    const geo = new t.BoxGeometry( 160, 10, 100 )
    const mesh = new t.Mesh( geo, mat )
    return mesh
}

const createTop = ( { color } ) => {
    const mat = new t.MeshPhongMaterial( { color } )
    const geo = new t.BoxGeometry( 160, 10, 100 )
    const mesh = new t.Mesh( geo, mat )
    mesh.position.y = 10
    return mesh
}

const createBottom = ( { color } ) => {
    const mat = new t.MeshPhongMaterial( { color } )
    const geo = new t.BoxGeometry( 160, 10, 100 )
    const mesh = new t.Mesh( geo, mat )
    mesh.position.y = -10
    return mesh
}
