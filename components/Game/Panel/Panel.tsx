import styled from "styled-components";
import UserPanel from "./UserPanel";
import Timer from "@/components/Timer";
import PanelEnemy from "./PanelEnemy";

const PanelWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    position: absolute;
    bottom: 0px;
    height: 100px;
    width: 100%;
    background-image: url(https://jooinn.com/images/stone-background-14.jpg);
    background-size: cover;
    box-shadow: 2px 2px 10px #000;
`


const Panel = () => {

    return (
        <PanelWrapper>
           <UserPanel />
           <PanelEnemy />
           <Timer />
        </PanelWrapper>
    )
};

export default Panel;