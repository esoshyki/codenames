export enum SocketActions {
    connected = "connected",
    CHANGE_ONLINE_USERS = "change-online-users",
    UPDATE_SERVER_DATA = "Socket/update-server-data",
    USER_CONNECTED = "Socket/User-Entered",
    USER_DISCONNECTED = "Socket/User-Disconnected",

    UPDATE_ONLINE_USERS_REQUEST = "Socket/Update-Online-Users-Request",
    LOGIN = "Socket/Login",
    LOGOUT = "Socket/Logout",
    DISCONNECTING = "disconnecting"
}