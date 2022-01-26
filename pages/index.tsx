import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { NextPage } from "next";
import Layout from "../components/Layout";
import Menu from "../components/Menu";
import Game from "@/components/Game";
import ReadyUsers from "@/components/ReadyUsers";
import { IState } from "@/store/types";
import { socket } from "socket/socket";
import { SocketServerActions } from "@/types/socket.actions";
import {
    setServerData,
    updateOnlineUsers,
    updateServerDataRequest
} from "@/store/server/server.actions";
import { User } from "@/types";
import { setSockedId } from "@/store/app/app.actions";
import { ServerData } from "@/store/server/server.types";
import { LoginResponse } from "@/types/socket.types";
import { setCurrentUser, setLoginError } from "@/store/users/users.actions";

const Home: NextPage = () => {
    const dispatch = useDispatch();

    const showGame = useSelector((state: IState) => state.app.showGame);

    const connectSocket = () => {
        socket.on("connect", () => {
            dispatch(setSockedId(socket.id));
            dispatch(updateServerDataRequest());
        });

        socket.on(SocketServerActions.CHANGE_ONLINE_USERS, (users: User[]) => {
            dispatch(updateOnlineUsers(users));
        });

        socket.on(SocketServerActions.UPDATE_SERVER_DATA_RESPONSE, (serverData: ServerData) => {
            dispatch(setServerData(serverData));
        })

        socket.on(SocketServerActions.LOGIN_RESPONSE, (response: LoginResponse) => {
            if (response.error) {
                dispatch(setLoginError(response.error))
            };

            if (response.user) {
                dispatch(setCurrentUser(response.user));
            };
        })
     };

    useEffect(() => {
        connectSocket();
    }, []);

    return (
        <Layout>
            {!showGame && <Menu />}
            {showGame && <Game />}
            {!showGame && <ReadyUsers />}
        </Layout>
    );
};

export default Home;
