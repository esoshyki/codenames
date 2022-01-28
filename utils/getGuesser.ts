import { GuesserTypes, GuesserType } from "@/store/game/game.types";

export const getGuesserData = () : GuesserType => {
    const red = GuesserTypes.red;
    const blue = GuesserTypes.blue;
    const white = GuesserTypes.white;
    const black = GuesserTypes.black;

    const start = Math.random() > 0.5 ? red : blue;

    return {
        start,
        data: [
            ...new Array(9).fill(start === red ? red : blue),
            ...new Array(8).fill(start === red ? blue : red),
            ...new Array(7).fill(white),
            black
        ].sort(() => 0.5 - Math.random())
    };
};
