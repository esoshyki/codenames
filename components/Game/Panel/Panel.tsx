import styled from "styled-components";
import UserPanel from "./UserPanel";

const PanelWrapper = styled.div`
    position: -webkit-sticky;
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
        </PanelWrapper>
    )
};

export default Panel;