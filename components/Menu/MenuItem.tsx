import styled from "styled-components";
import { colors } from "@/theme/colors";

const MenuItem = styled.span`
    font-family: 'Mochiy Pop P One', sans-serif;
    font-size: 32px;
    margin: 10px 0;
    &:hover {
        color: ${colors.yellow};
        cursor: pointer;
    }
`

export default MenuItem;