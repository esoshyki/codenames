import { Locales } from "./locales";

export enum SelectCollectionContent {
    selectCollection = "selectCollection",
}

export const selectCollectionContent = {
    [Locales.ru] : {
        [SelectCollectionContent.selectCollection]: "Выберитe коллекцию",
    },
    [Locales.en] : {
        [SelectCollectionContent.selectCollection]: "Choose collection",
    },
    [Locales.be] : {
        [SelectCollectionContent.selectCollection]: "Абярыце калекцыю",
    },  
};

export const getSelectCollectionContent = (
    locale: Locales,
    key: SelectCollectionContent
    ) => {
        return selectCollectionContent[locale][key]
    }