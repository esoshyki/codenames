import { InGameUser } from "@/store/game/game.types";
import { User } from "@/types";

export const createGameMember = (user: User) : InGameUser => ({
    userName: user.userName,
    ready: false,
    team: null
});