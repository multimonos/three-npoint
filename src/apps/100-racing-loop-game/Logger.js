export const Logger = () => {
    let logged = false

    const log = ( ...args ) => {
        if ( ! logged ) {
            console.log( ...args )
            logged = true
        }
    }

    return {
        log,
    }
}
