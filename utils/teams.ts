import { CollectionVote, InGameUser, Sides } from "@/store/game/game.types";

export const teamsAreComplete = (gameMembers: InGameUser[]) => {
    const redTeamCount = gameMembers.filter((member) => member.team === Sides.red).length;
    const blueTeamCount = gameMembers.filter((member) => member.team === Sides.blue).length;

    return redTeamCount >= 2 && blueTeamCount >= 2;
};

export const allReady = (gameMembers: InGameUser[]) => {
    return gameMembers.every((member) => member.ready)
};

export const allCollectionVotesDone = (votes: CollectionVote[], gameMembers: InGameUser[]) => {
    return votes.length === gameMembers.length;
};

export const getCollectionWinner = (votes: CollectionVote[]) : number => {

    const getVotesLen = (idx: number) => votes.filter(vote => vote.collectionIdx === idx).length;

    const sorted = votes.sort((a, b) => getVotesLen(b.collectionIdx) - getVotesLen(a.collectionIdx));
    const filtred = votes.filter(el => getVotesLen(el.collectionIdx) === getVotesLen(sorted[0].collectionIdx));

    if (filtred.length > 1) {
        return filtred[Math.floor(Math.random() * filtred.length)].collectionIdx
    };

    return filtred[0].collectionIdx;

}