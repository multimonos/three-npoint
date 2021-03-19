export const aspectRatio = () =>
    width() / height()

export const width = () =>
    window.innerWidth

export const height = () =>
    window.innerHeight

export const addEvent = name => callback =>
    window.addEventListener( name, callback )

export const addResizeHandler = renderer => camera =>
    addEvent( "resize" )( onResize( renderer )( camera ) )

export const onResize = renderer => camera => event => {
    camera.aspect = aspectRatio()
    camera.updateProjectionMatrix()
    renderer.setSize( width(), height() )
}