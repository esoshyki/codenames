import { colors } from "@/theme/colors";
import styled from "styled-components";

const PanelActionButton = styled.button`
    padding: 20px 30px;
    background-color: transparent;
    border: 1px solid #fff;
    color: #fff;
    margin: 20px;
    transition: background-color 0.3s ease-in, top 0.1s ease-in;
    position: relative;
    top: 0px;
    &:hover {
        cursor: pointer;
        background-color: ${colors.blue};
    }
    &:active {
        cursor: default;
        top: 2px;
    }
`;

export default PanelActionButton;