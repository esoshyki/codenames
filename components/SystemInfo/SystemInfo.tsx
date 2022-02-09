import { select } from "@/store/select";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { colors } from "@/theme/colors";
import { Fragment } from "react";

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


const SystemInfo = () => {

    const sytemInfo = useSelector(select.app.systemInfo);

    const getContent = () => {
        
        return (
            <Fragment>
                <SystemInfoVersion>{`Version ${sytemInfo.version}`}</SystemInfoVersion>

                <SystemInfoConnected connected={sytemInfo.connectionStatus === "connected"}>
                    {sytemInfo.connectionStatus}
                </SystemInfoConnected>

            </Fragment>
        )
    };

    return (
        <SystemInfoWrapper>
            {getContent()}
        </SystemInfoWrapper>
    )
};

export default SystemInfo