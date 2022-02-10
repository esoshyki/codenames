import { select } from "@/store/select";
import { colors } from "@/theme/colors";
import { useSelector } from "react-redux";
import styled from "styled-components";

const OnlineUsersWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: row;
`

const Title = styled.span`
    color: #fff;
    font-size: 12px;
    margin-right: 20px;
`

const UserNameWrapper = styled.span<{
    connected: boolean
}>`
    color: ${props => props.connected ? colors.green : colors.red};
    font-size: 12px;
    margin: 0 10px;
`

const SystemInfoOnlineUsers = () => {

    const onlineUsers = useSelector(select.connection.onlineUsers)
                        .map(user => user.userName ? user : {...user, userName: "Noname"});

    return (
        <OnlineUsersWrapper>
            <Title>В сети: </Title>

            {onlineUsers.map((user, idx) => (
                <UserNameWrapper 
                    connected={Boolean(user.socketId)} 
                    key={idx}>
                        {user.userName}
                </UserNameWrapper>
            ))}
            
        </OnlineUsersWrapper>
    )
};

export default SystemInfoOnlineUsers;