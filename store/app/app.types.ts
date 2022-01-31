export enum AppActions {
    SHOW_LOADING = "App/Show-Loading",
    HIDE_LOADING = "App/Hide-Loading",
    SHOW_LOGIN_COMPONENT = "App/Show-Login-Component",
    HIDE_LOGIN_COMPONENT = "App/Hide-Login-Component",
    SHOW_GAME_COMPONENT = "App/Show-Game-Component",
    HIDE_GAME_COMPONENT = "App/Hide-Game-Component",
    CHANGE_SOCKET_ID_REQUEST = "App/Change-Socket-Id-Request",
    SET_SOCKET_ID = "App/Set-Socket-Id",
    SET_INFO = "App/Set-Info",
    SET_TIMER = "App/Set-Timer",
    SET_SELECTED_CARDS = "App/Set-Selected-Cards",
}

export interface AppState {
    socketId: string | null;
    showLogin: boolean;
    showGame: boolean;
    processing: boolean;
    info: string | null;
    timer: number | null;
    selectedCards: number[];
}
