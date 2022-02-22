import { Locales } from "./locales";

export enum ErrorsContent {
    userExists = "userExists",
}

export const errorsContent = {
    [Locales.ru] : {
        [ErrorsContent.userExists] : "Пользователь с таким именем уже вошел",
    },
    [Locales.en] : {
        [ErrorsContent.userExists] : "User with this userName has already entered",
    },
    [Locales.be] : {
        [ErrorsContent.userExists] : "Карыстальнік з такім імем ужо ўвайшоў",
    },  
};

export const getErrorContent = (
    locale: Locales,
    key: ErrorsContent
    ) => {
        return errorsContent[locale][key]
    }