import * as t from "three";

export const createAudio = () => {
    const listener = new t.AudioListener()
    const audio = new t.Audio( listener )
    const url = "https://res.cloudinary.com/multimonos/video/upload/v1612041734/audio/waves-and-radiation/ambient-1.mp3"
    // const url = "https://res.cloudinary.com/multimonos/video/upload/v1612041823/audio/animals/wolf.mp3"
    new t.AudioLoader()
        .load( url, playAudio( audio ) )

    return audio
}

export const playAudio = audio => buffer => {
    console.log( 'audio loaded' )
    audio.setBuffer( buffer )
    audio.play()
}

export const getWaveformData = AudioAnalyser => {
    // @see https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API
    const samples = new Uint8Array( AudioAnalyser.analyser.frequencyBinCount )
    const normalized = new Float32Array( AudioAnalyser.analyser.frequencyBinCount )
    AudioAnalyser.analyser.getByteTimeDomainData( samples )
    samples.map( ( s, i ) => normalized[i] = s / 256 - 0.5 )
    return normalized
}