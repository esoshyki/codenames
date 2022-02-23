import { Sides, Neutrals, ICard, IRound, IField } from "@/types/game";
import { getWords } from "@/utils/wordCollections";

export const createCard = (text: string, type: Sides | Neutrals, id: number) : ICard => ({
    text,
    type,
    votes: 0,
    covered: false,
    id
});

export const createField = (collectionIdx : number) : IField  => {
    const red = Sides.red;
    const blue = Sides.blue;
    const white = Neutrals.white;
    const black = Neutrals.black;

    const start = Math.random() > 0.5 ? red : blue;

    const guesser = [
            ...new Array(9).fill(start === red ? red : blue),
            ...new Array(8).fill(start === red ? blue : red),
            ...new Array(7).fill(white),
            black
        ].sort(() => 0.5 - Math.random())

    const cards = getWords(collectionIdx).map((text, idx) => createCard(text, guesser[idx], idx))

    return {
        start,
        cards
    }

};

export const nextRound = (number: number, start: Sides) : IRound => {
    return {
        number,
        time: 120,
        check: number % 2 ? start : (start === Sides.blue ? Sides.red : Sides.blue),
        passVotes: 0
    }
}