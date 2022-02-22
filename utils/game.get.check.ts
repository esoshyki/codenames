import { IRound, Sides } from "@/types/game";

export const getCheck = (round: IRound, start: Sides) : Sides => {
    const startTeam = start;
    const secondTeam = start === Sides.blue ? Sides.red : Sides.blue;

    return round.number % 2 ? startTeam : secondTeam;
}