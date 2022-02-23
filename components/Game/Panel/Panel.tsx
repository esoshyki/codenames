import styled from "styled-components";
import UserPanel from "./PanelUser";
import PanelEnemy from "./PanelEnemy";
import { IField, IRound } from "@/types/game";
import { IUser } from "@/types/users";
import PanelRoundInfo from "./PanelRoundInfo";

const PanelWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    position: absolute;
    bottom: 0px;
    width: 100%;
    background-image: url(https://jooinn.com/images/stone-background-14.jpg);
    background-size: cover;
    box-shadow: 2px 2px 10px #000;
    padding-right: 20%;
`

export interface PanelProps {
    field: IField,
    round: IRound,
    currentUser: IUser
}

const Panel = (props : PanelProps) => {

    return (
        <PanelWrapper>
           <UserPanel {...props}/>
           <PanelEnemy {...props}/>
           <PanelRoundInfo {...props} />
        </PanelWrapper>
    )
};

export default Panel;