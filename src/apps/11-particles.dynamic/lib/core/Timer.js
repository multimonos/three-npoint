import { Clock } from "three";

export const create = () => ({
    clock: new Clock(),
    delta: 0,
})

export const next = state => {
    state.timer.delta = state.timer.clock.getDelta()
    return state
}
