export enum AppTypes {
    SET_CONNECTED_STATUS = "App/Set-Connected-Status",
    SET_SHOW_LOGIN = "App/Set-Show-Login",
    UPDATE_ONLINE_USERS_REQUEST = "App/Update-Online-Users-Request"
};

export interface AppState {
    connected: boolean;
    showLogin: boolean;
};

