import { wordCollections } from "utils/wordCollections";
import styled from "styled-components";
import FieldChooseCollection from "./FieldChooseCollection";

const FieldSettingsWrapper = styled.div`
    position: fixed;
    left: 0;
    top: 50%;
    width: 200px;
    height: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 0 20px;
`;

const FieldSettings = () => {
    return (
        <FieldSettingsWrapper>
            <h5>Settings</h5>
            <FieldChooseCollection />
        </FieldSettingsWrapper>
    );
};

export default FieldSettings;
