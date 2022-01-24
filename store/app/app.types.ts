export enum AppTypes {
    SET_SHOW_LOGIN = "App/Set-Show-Login",
    UPDATE_ONLINE_USERS_REQUEST = "App/Update-Online-Users-Request",
    SHOW_USER_CONNECTED_AD = "App/Show-User-Connected-Ad",
    SHOW_USER_DISCONNECTED_AD = "App/Show-User-Disconnected-Ad",
    SET_SOCKET_ID = "App/Set-Socket-ID",
    SET_SHOW_GAME = "App/Set-Show-Game",
};

export interface AppState {
    showLogin: boolean;
    userConnectedAd: string | null;
    userDisconnectedAd: string | null;
    socketId: string | null;
    showGame: boolean;
};

