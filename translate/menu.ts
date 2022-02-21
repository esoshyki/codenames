import { Locales } from "./locales";

export enum MenuContent {
    yourName = "yourName",
    beginGame = "beginGame",
}

export const menuContent = {
    [Locales.ru] : {
        [MenuContent.yourName]: "Как ваше имя?",
        [MenuContent.beginGame]: "Начать игру",
    },
    [Locales.en] : {
        [MenuContent.yourName]: "What is your name?",
        [MenuContent.beginGame]: "Begin game",
    },
    [Locales.be] : {
        [MenuContent.yourName]: "Ваша iмя",
        [MenuContent.beginGame]: "Пачать гульню",
    },  
};

export const getMenuContent = (
    locale: Locales, key: MenuContent
    ) => {
        console.log(`locale`, locale);
        return menuContent[locale][key]
    }