import { Locales } from "./locales";

export enum PrestartContent {
    waitingForPlayers = "waitingForPlayers",
    gameMembers = "gameMembers",
    redTeam = "redTeam",
    blueTeam = "blueTeam",
    ready = "ready",
    notReady = "notReady",
    makeMeALeader = "makeMeALeader",
    dontBeALeader = "dontBeALeader",
    joinRedTeam = "joinRedTeam",
    leaveRedTeam = "leaveRedTeam",
    joinBlueTeam = "joinBlueTeam",
    leaveBlueTeam = "leaveBlueTeam",
    JoinGame = "joinGame"
}

export const preStartContent = {
    [Locales.ru] : {
        [PrestartContent.waitingForPlayers]: "Ожидание игроков",
        [PrestartContent.gameMembers] : "Участники игры",
        [PrestartContent.redTeam] : "Красная команда",
        [PrestartContent.blueTeam] : "Синяя команда",
        [PrestartContent.ready] : "Готов",
        [PrestartContent.notReady] : "Не готов", 
        [PrestartContent.makeMeALeader] : "Сделать меня лидером",
        [PrestartContent.dontBeALeader] : "Не буду лидером",
        [PrestartContent.joinRedTeam] : "Присоеденится к красной команде",
        [PrestartContent.joinBlueTeam] : "Присоеденится к синей команде",  
        [PrestartContent.leaveRedTeam] : "Покинуть красную команду",
        [PrestartContent.leaveBlueTeam] : "Покинуть синюю команду",
        [PrestartContent.JoinGame] : "Присоединиться к игре",
    },
    [Locales.en] : {
        [PrestartContent.waitingForPlayers]: "Waitin for players",
        [PrestartContent.gameMembers] : "Game members",
        [PrestartContent.redTeam] : "Red team",
        [PrestartContent.blueTeam] : "Blue team",
        [PrestartContent.ready] : "Ready",
        [PrestartContent.notReady] : "Not ready", 
        [PrestartContent.makeMeALeader] : "Make me a leader",
        [PrestartContent.dontBeALeader] : "Don't be a leader",
        [PrestartContent.joinRedTeam] : "Join red team",
        [PrestartContent.joinBlueTeam] : "Join blue team",
        [PrestartContent.leaveRedTeam] : "Leave red team",
        [PrestartContent.leaveBlueTeam] : "Leave blue team",
        [PrestartContent.JoinGame] : "Join game",
    },
    [Locales.be] : {
        [PrestartContent.waitingForPlayers]: "Чаканне гульцов",
        [PrestartContent.gameMembers] : "Удзельнікі гульні",
        [PrestartContent.redTeam] : "Чырвоная каманда",
        [PrestartContent.blueTeam] : "Сiняя каманда",
        [PrestartContent.ready] : "Гатовы",
        [PrestartContent.notReady] : "Не гатовы", 
        [PrestartContent.makeMeALeader] : "Зрабiць мяне лiдэрам",
        [PrestartContent.dontBeALeader] : "Ня быць лiдэрам",
        [PrestartContent.joinRedTeam] : "Далучыцца да чырвонай каманды",
        [PrestartContent.joinBlueTeam] : "Далучыцца да сiняй каманды",
        [PrestartContent.leaveRedTeam] : "Пакінуць чырвоную каманду",
        [PrestartContent.leaveBlueTeam] : "Пакінуць сiнюю каманду",
        [PrestartContent.JoinGame] : "Далучыцца да гульнi"
    },  
};

export const getPreStartContent = (
    locale: Locales,
    key: PrestartContent
    ) => {
        return preStartContent[locale][key]
    }