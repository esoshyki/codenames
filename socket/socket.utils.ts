import { Sides, Neutrals, ICard } from "@/types/game";

export const getGuesserData = () : Array<Sides | Neutrals>  => {
    const red = Sides.red;
    const blue = Sides.blue;
    const white = Neutrals.white;
    const black = Neutrals.black;

    const start = Math.random() > 0.5 ? red : blue;

    return [
            ...new Array(9).fill(start === red ? red : blue),
            ...new Array(8).fill(start === red ? blue : red),
            ...new Array(7).fill(white),
            black
        ].sort(() => 0.5 - Math.random())
};

export const createCard = (text: string, type: Sides | Neutrals) : ICard => ({
    text,
    type,
    votes: [],
    covered: false
});