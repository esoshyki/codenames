import { Locales } from "./locales";

export enum PrestartContent {
    waitingForPlayers = "waitingForPlayers",
}

export const preStartContent = {
    [Locales.ru] : {
        [PrestartContent.waitingForPlayers]: "Ожидание игроков"
    },
    [Locales.en] : {
        [PrestartContent.waitingForPlayers]: "Waitin for players"
    },
    [Locales.be] : {
        [PrestartContent.waitingForPlayers]: "Чаканне гульцов"
    },  
};

export const getPrestartContent = (
    locale: Locales, key: PrestartContent
    ) => preStartContent[locale][key]