import * as t from "three";

export const create = () => ({
    clock: new t.Clock(),
    delta: 0,
})

export const next = timer => {
    timer.delta = timer.clock.getDelta()
    return timer
}
