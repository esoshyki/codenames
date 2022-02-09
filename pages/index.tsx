import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { NextPage } from "next";
import Layout from "../components/Layout";
import Menu from "../components/Menu";
import { connectSocket } from "@/socket/client";
import { AppStages } from "@/types/app";
import { select } from "@/store/select";

const Home: NextPage = () => {
    const dispatch = useDispatch();

    const stage = useSelector(select.app.stage);

    useEffect(() => {
        connectSocket(dispatch);
    }, []);

    return (
        <Layout>
            {stage === AppStages.nogame && <Menu />}
            {/* {stage === AppStages.prestart && <PreStart />} */}

            {/* {stage !== GameStages.noGame && <Game />} */}
        </Layout>
    );
};

export default Home;
