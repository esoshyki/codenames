import { keyframes } from 'styled-components';
import styled from 'styled-components';
import { colors } from '@mui/material';

const fadeOut = keyframes`
    0% {
        opacity: 1;
        left: -400px;
    }
    10% {
        opacity: 1;
        left: 0px;
    }
    70% {
        opacity: 1;
        left: 0px;
    }
    100% {
        opacity: 0;
        left: -400px;
    }
`

const Message = styled.div`
    position: fixed;
    background-color: #fff;
    left: 0;
    top: 20px;
    width: 400px;
    margin: 5px auto;
    color: ${colors.red};
    border-radius: 15px;
    overflow: hidden;
    min-height: 40px;
    padding: 50px 30px;
    opacity: 1;
    animation: ${fadeOut} 5s linear 0s;
    z-index: 200000;
`;

export default Message;