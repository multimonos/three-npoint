import * as t from "three";

export const createAudio = () => {
    const listener = new t.AudioListener()
    const audio = new t.Audio( listener )
    const url = "https://res.cloudinary.com/multimonos/video/upload/v1612041734/audio/waves-and-radiation/ambient-1.mp3"
    const loader = new t.AudioLoader()

    //no return value
    loader.load( url, playAudio( audio ) )

    return audio
}

const playAudio =  audio => buffer => {
    console.log('audio loaded')
    audio.setBuffer( buffer )
    audio.play()
}

