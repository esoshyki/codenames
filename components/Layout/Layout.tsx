import { ReactNode } from "react";
import classes from "./Layout.module.sass";
import Head from "next/head";
import { useSelector } from "react-redux";
import { IState } from "../../store/types";
import Loading from "../Loading";
import Info from "../Info";
import Menu from "../Menu";

interface LayoutProps {
    children: ReactNode;
    pageName?: string;
}

const Layout = ({ children, pageName }: LayoutProps) => {
    const processing = useSelector((state: IState) => state.app.processing);
    const currentUser = useSelector((state: IState) => state.users.currentUser);
    const gameMembers = useSelector((state: IState) => state.game.gameMembers);

    const isInGame = () => {
        return gameMembers.some(member => member.userName === currentUser?.userName);
    }

    return (
        <div className={classes.page_container}>
            <Head>
                <title>{pageName || "Codenames"}</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Info />
                {!isInGame() && <Menu />}
                {children}
            </main>
            {processing && <Loading />}
        </div>
    );
};

export default Layout;
