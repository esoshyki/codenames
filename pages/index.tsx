import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { NextPage } from "next";
import Layout from "../components/Layout";
import Menu from "../components/Menu";
import { connectSocket } from "@/socket/client";
import { AppStages } from "@/types/app";
import { select } from "@/store/select";
import PreStart from "@/components/PreStart";
import SelectCollection from "@/components/SelectCollection";
import Game from "@/components/Game";

const Home: NextPage = () => {
    const dispatch = useDispatch();

    const stage = useSelector(select.app.stage);
    const currentUser = useSelector(select.connection.currentUser);
    const gameMembers = useSelector(select.game.gameMembers);


    const showMenu = () => !(gameMembers.some(member => member.userName === currentUser.userName));

    useEffect(() => {
        connectSocket(dispatch);
    }, [dispatch]);

    return (
        <Layout>
            {showMenu() && <Menu />}
            {stage === AppStages.prestart && <PreStart />}
            {stage === AppStages.CollectionVote && <SelectCollection />}

            {stage === AppStages.game && <Game />}
        </Layout>
    );
};

export default Home;
