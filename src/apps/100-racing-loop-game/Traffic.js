import * as Agent from "./Agent";
import * as Car from "./Car";

export const create = () => {
    const count = Math.ceil( Math.random() * 5 )
    const traffic = []

    for (let i = 0; i < count; i++) {
        const agent = Agent.create( {
            id: `traffic${i}`,
            mesh: Car.create(),
            track: "right",
            direction: 1,
            angle: Math.random() * 2 * Math.PI,
            startAngle: Math.random() * 2 * Math.PI,
            speed: Math.random() * 2,
        } )
        traffic.push( agent )

    }

    return traffic
}