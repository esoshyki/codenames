export enum SocketServerActions {
    connected = "connected",
    CHANGE_ONLINE_USERS = "change-online-users",
    UPDATE_SERVER_DATA = "Socket/update-server-data",
    LOGIN_RESPONSE = "Socket/Login-Response",
    LOGOUT_RESPONSE = "Socket/Logout-Response",
    UPDATE_SERVER_DATA_RESPONSE = "Socket/Update-Server-Data-Response",
}

export enum SocketClientActions {
    UPDATE_ONLINE_USERS_REQUEST = "Socket/Update-Online-Users-Request",
    UPDATE_SERVER_DATA_REQUEST = "Socket/Update-Server-Data-Request",
    LOGIN_REQUEST = "Socket/Login-Request",
    LOGOUT_REQUEST = "Socket/Logout-Request",
    DISCONNECTING = "disconnecting"
}
