import { select } from "@/store/select";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { colors } from "@/theme/colors";
import { Fragment } from "react";
import { SystemInfo } from "@/types/system";
import SystemInfoOnlineUsers from "./SystemInfoOnlineUsers";

const SystemInfoWrapper = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 20px;
    font-size: 12px;
`;

const SystemInfoVersion = styled.span`
    color: ${colors.yellow};
`;

const SystemInfoConnected = styled.span<{
    connected: boolean;
}>`
    color: ${props => props.connected ? colors.green : colors.red};
    margin: 10px;
`;

const SystemInfoComponent = () => {

    const currentUser = useSelector(select.connection.currentUser);

    const systemInfo: SystemInfo = {
        version: "1.1",
        connectionStatus: currentUser.socketId ? "connected" : "disconnected"
    };

    const getContent = () => {
        
        return (
            <Fragment>
                <SystemInfoVersion>{`Version ${systemInfo.version}`}</SystemInfoVersion>

                <SystemInfoConnected connected={systemInfo.connectionStatus === "connected"}>
                    {systemInfo.connectionStatus}
                </SystemInfoConnected>

            </Fragment>
        )
    };

    return (
        <Fragment>
            <SystemInfoWrapper>
                {getContent()}
            </SystemInfoWrapper>

            <SystemInfoOnlineUsers />
        </Fragment>

    )
};

export default SystemInfoComponent;