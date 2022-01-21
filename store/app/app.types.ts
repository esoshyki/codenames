export enum AppTypes {
    SET_CONNECTED_STATUS = "App/Set-Connected-Status",
    SET_SHOW_LOGIN = "App/Set-Show-Login"
};

export interface AppState {
    connected: boolean;
    showLogin: boolean;
};

