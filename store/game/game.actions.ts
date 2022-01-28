import { ReduxAction, User } from "@/types";
import { Collection } from "@/utils/wordCollections";
import { CollectionVote, GameActions, GameStages, GuesserType, Sides } from "./game.types";

export const startGameRequest = () : ReduxAction => ({
    type: GameActions.START_GAME_REQUEST
});

export const setGameMembers = (gameMembers: User[]) : ReduxAction => ({
    type: GameActions.SET_GAME_MEMBERS,
    payload: gameMembers
});

export const setTeamRequest = (side: Sides | null) : ReduxAction => ({
    type: GameActions.SET_TEAM_REQUEST,
    payload: side
});

export const setLeaderRequest = () : ReduxAction => ({
    type: GameActions.SET_LEADER_REQUEST,
});

export const toggleReadyRequest = () : ReduxAction => ({
    type: GameActions.TOGGLE_READY_REQUEST
});

export const setGameStage = (stage: GameStages) : ReduxAction => ({
    type: GameActions.SET_STAGE,
    payload: stage
});

export const toggleCollectionVoteRequest = (idx: number) : ReduxAction => ({
    type: GameActions.TOGGLE_COLLECTION_VOTE_REQUEST,
    payload: idx
});

export const setCollectionVotes = (votes: CollectionVote[]) : ReduxAction => ({
    type: GameActions.SET_COLLECTION_VOTES,
    payload: votes
});

export const setCollection = (collection: Collection | null) : ReduxAction => ({
    type: GameActions.SET_COLLECTION,
    payload: collection
});

export const setFieldData = (words: string[]) : ReduxAction => ({
    type: GameActions.SET_FIELD_DATA,
    payload: words
});

export const setGuesserData = (guesserData: GuesserType | null) => ({
    type: GameActions.SET_GUESSER_DATA,
    payload: guesserData
});

