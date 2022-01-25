import { Collection } from "utils/wordCollections";
import { IAction, IFBUserData, IUser } from "../types";
import { GameActions } from "./game.types";

export const setGuesserData = (data: string[]): IAction => ({
    type: GameActions.SET_GUESSER_DATA,
    payload: data
});

export const setStartSide = (side: "red" | "blue" | null): IAction => ({
    type: GameActions.SET_START_SIDE,
    payload: side
});

export const gameStartRequest = (collectionIdx?: number): IAction => ({
    type: GameActions.GAME_START_REQUEST,
    payload: collectionIdx
});

export const getWordsRequest = (collectionIdx?: number): IAction => ({
    type: GameActions.GET_WORDS_REQUEST,
    payload: collectionIdx
});

export const setCollection = (collection: Collection): IAction => ({
    type: GameActions.SET_COLLECTION,
    payload: collection
});

export const setFieldData = (fieldData: string[] | null): IAction => ({
    type: GameActions.SET_FIELD_DATA,
    payload: fieldData
});

export const setReadyRequest = (user: IFBUserData): IAction => ({
    type: GameActions.SET_READY_REQUEST,
    payload: user
});

export const setUnreadyRequest = (user: IFBUserData): IAction => ({
    type: GameActions.SET_UNREADY_REQUEST,
    payload: user
});

export const getReadyUsersRequest = (): IAction => ({
    type: GameActions.GET_READY_USERS_REQUEST
});

export const setGameMembers = (users: IFBUserData[]): IAction => ({
    type: GameActions.SET_MEMBERS,
    payload: users
});

export const getVotedToStartMembers = (): IAction => ({
    type: GameActions.GET_VOTED_TO_START
});

export const setVotedToStartMembers = (payload: IFBUserData[]): IAction => ({
    type: GameActions.SET_WANTED_TO_START,
    payload: payload
});
