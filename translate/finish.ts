import { Locales } from "./locales";

export enum FinishContent {
    RedTeamWon = "RedTeamWin",
    BlueTeamWon = "BlueTeamWon",
    Score = "Score",
    BlackCard = "BlackCard",
    AllCardsCovered = "AllCardsCovered",
    Exit = "Exit"
}

export const menuContent = {
    [Locales.ru] : {
        [FinishContent.RedTeamWon]: "Победила красная команда!",
        [FinishContent.BlueTeamWon]: "Победила синяя команда!",
        [FinishContent.Score] : "Счет",
        [FinishContent.BlackCard] : "Закрыта ЧЁРНАЯ КАРТА",
        [FinishContent.AllCardsCovered] : "Все карты закрыты",
        [FinishContent.Exit] : "Выйти в меню"
    },
    [Locales.en] : {
        [FinishContent.RedTeamWon]: "Red team won!",
        [FinishContent.BlueTeamWon]: "Blue team won!",
        [FinishContent.Score] : "Score",
        [FinishContent.BlackCard] : "THE BLACK CARD has been covered",
        [FinishContent.AllCardsCovered] : "All card have been covered",
        [FinishContent.Exit] : "Exit to menu"
    },
    [Locales.be] : {
        [FinishContent.RedTeamWon]: "Перамагла чырвоная каманда",
        [FinishContent.BlueTeamWon]: "Перамагла сiняя каманда",
        [FinishContent.Score] : "Рахунак",
        [FinishContent.BlackCard] : "Зачынена ЧОРНАЯ КАРТКА",
        [FinishContent.AllCardsCovered] : "Усе карткi зачынены",
        [FinishContent.Exit] : "Выйсцi у меню"
    },  
};

export const getFinishContent = (
    locale: Locales,
    key: FinishContent
    ) => {
        return menuContent[locale][key]
    }
