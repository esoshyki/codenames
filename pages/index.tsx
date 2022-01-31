import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { NextPage } from "next";
import Layout from "../components/Layout";
import Menu from "../components/Menu";
import Game from "@/components/Game";
import { IState } from "@/store/types";
import { connectSocket } from "@/socket/socket.client";
import { GameStages } from "@/store/game/game.types";

const Home: NextPage = () => {
    const dispatch = useDispatch();

    const stage = useSelector((state: IState) => state.game.gameData.stage);

    useEffect(() => {
        connectSocket(dispatch);
    }, []);

    return (
        <Layout>
            {stage === GameStages.noGame && <Menu />}
            {stage !== GameStages.noGame && <Game />}
        </Layout>
    );
};

export default Home;
