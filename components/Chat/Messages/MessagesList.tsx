import styled from 'styled-components';

const MessagesList = styled.div`
    height: 80%;
    width: 100%;
    overflow-y: scroll;
    position: relative;
    &::-webkit-scrollbar {
        width: 10px;
        background-color: #fff;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #ccc0c0;
    }
`;

export default MessagesList;