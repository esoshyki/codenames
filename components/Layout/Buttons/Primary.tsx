import { colors } from '@/theme/colors';
import styled from 'styled-components';

const ButtonPrimary = styled.button`
    padding: 20px;
    background-color: transparent;
    color: ${colors.blue};
    font-weight: 800;
    border: 1px solid ${colors.blue};
    min-width: 200px;
    border-radius: 35px;
    margin: 20px;
    transition: 0.3s ease-in;
    position: relative;
    top: 0;
    &:hover {
        cursor: pointer;
        color: ${colors.yellow};
        background-color: ${colors.blue};
    };
    &:active {
        top: 3px;
    }
`;

export default ButtonPrimary;