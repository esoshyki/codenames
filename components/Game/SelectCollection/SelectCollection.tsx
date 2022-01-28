import styled from "styled-components";
import { wordCollections } from "@/utils/wordCollections";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "@/store/types";
import { toggleCollectionVoteRequest } from "@/store/game/game.actions";

const SelectCollectionWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const SelectCollectionTitle = styled.h4`
    margin-bottom: 20px;
`;

const SelectCollectionConteiner = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
`

const SelectCollectionItem = styled.div`
    position: relative;
    width: 150px;
    height: 100px;
    background-color: #fff;
    border-radius: 20px;
    margin: 20px;
    color: #000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    transition: 0.3s ease-in;
    &:hover {
        cursor: pointer;
        transform: translateY(10px)
    }
`;

const VotedUsers = styled.div`
    position: absolute;
    width: 150px;
    top: 100px;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`;

const Voter = styled.span`
    font-size: 12px;
    color: #fff;
    font-weight: 700;
`

const SelectCollection = () => {

    const dispatch = useDispatch();

    const collectionVotes = useSelector((state:IState) => state.game.gameData.collectionVotes);

    const togglePickCollection = (idx: number) => {
        dispatch(toggleCollectionVoteRequest(idx))
    };

    const getVotedContent = (idx: number) => {
        return collectionVotes.filter(vote => vote.collectionIdx === idx);
    };

    return (
        <SelectCollectionWrapper>

            <SelectCollectionTitle>
                Sellect Collection
            </SelectCollectionTitle>

            <SelectCollectionConteiner>

                {wordCollections.map((collection => (

                    <SelectCollectionItem 
                        key={collection.idx} 
                        onClick={() => togglePickCollection(collection.idx)}
                        >
                        {collection.title}
                        <VotedUsers>
                            {getVotedContent(collection.idx) && getVotedContent(collection.idx).map((vote) => (
                                <Voter>{vote.userName}</Voter>
                            ))}
                        </VotedUsers>
                    </SelectCollectionItem>

                )))}

            </SelectCollectionConteiner>


        </SelectCollectionWrapper>
    )
};

export default SelectCollection;