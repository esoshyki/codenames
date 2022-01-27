import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { NextPage } from "next";
import Layout from "../components/Layout";
import Menu from "../components/Menu";
import Game from "@/components/Game";
import ReadyUsers from "@/components/ReadyUsers";
import { IState } from "@/store/types";
import { connectSocket } from "@/socket/socket.client";

const Home: NextPage = () => {
    const dispatch = useDispatch();

    const currenUser = useSelector((state: IState) => state.users.currentUser);
    const gameMembers = useSelector((state: IState) => state.game.gameMembers);

    const showGame = () => {

        if (currenUser) {
            return gameMembers.some((member) => member.userName === currenUser.userName)
        };
        
        return false
    }

    useEffect(() => {
        connectSocket(dispatch);
    }, []);

    return (
        <Layout>
            {!showGame() && <Menu />}
            {showGame() && <Game />}
            {!showGame() && <ReadyUsers />}
        </Layout>
    );
};

export default Home;
