import { Collection } from "utils/wordCollections";
import { IFBUserData } from "../types";
import { ReduxAction } from "@/types";
import { GameActions } from "./game.types";

export const setGuesserData = (data: string[]): ReduxAction => ({
    type: GameActions.SET_GUESSER_DATA,
    payload: data
});

export const setStartSide = (side: "red" | "blue" | null): ReduxAction => ({
    type: GameActions.SET_START_SIDE,
    payload: side
});

export const gameStartRequest = (collectionIdx?: number): ReduxAction => ({
    type: GameActions.GAME_START_REQUEST,
    payload: collectionIdx
});

export const getWordsRequest = (collectionIdx?: number): ReduxAction => ({
    type: GameActions.GET_WORDS_REQUEST,
    payload: collectionIdx
});

export const setCollection = (collection: Collection): ReduxAction => ({
    type: GameActions.SET_COLLECTION,
    payload: collection
});

export const setFieldData = (fieldData: string[] | null): ReduxAction => ({
    type: GameActions.SET_FIELD_DATA,
    payload: fieldData
});

export const setReadyRequest = (user: IFBUserData): ReduxAction => ({
    type: GameActions.SET_READY_REQUEST,
    payload: user
});

export const setUnreadyRequest = (user: IFBUserData): ReduxAction => ({
    type: GameActions.SET_UNREADY_REQUEST,
    payload: user
});

export const getReadyUsersRequest = (): ReduxAction => ({
    type: GameActions.GET_READY_USERS_REQUEST
});

export const setGameMembers = (users: IFBUserData[]): ReduxAction => ({
    type: GameActions.SET_MEMBERS,
    payload: users
});

export const getVotedToStartMembers = (): ReduxAction => ({
    type: GameActions.GET_VOTED_TO_START
});

export const setVotedToStartMembers = (payload: IFBUserData[]): ReduxAction => ({
    type: GameActions.SET_WANTED_TO_START,
    payload: payload
});
