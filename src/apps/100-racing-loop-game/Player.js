import * as Agent from "./Agent";
import * as Car from "./Car";

export const create= () => Agent.create( {
    id: "player",
    mesh: Car.create(),
    track: "left",
    direction: -1,
    startAngle: Math.PI,
} )