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

    const showGame = useSelector((state: IState) => state.app.showGame);

    useEffect(() => {
        connectSocket(dispatch);
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
