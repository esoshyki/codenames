import { User } from "@/types";

export interface ServerData {
    onlineUsers: User[],
};

export enum ServerActions {
    SET_SERVER_DATA = "Server/Set-Server-Data",
    SET_ONLINE_USERS = "Server/Set-Online-Users",
    UPDATE_ONLINE_USERS_REQUEST = "Server/Update-Online-Users-Request",
    UPDATE_SERVER_DATA_REQUEST = "/Server/Update-Server-Data-Request",
}
