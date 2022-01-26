export interface User {
    userName: string;
}

export interface ReduxAction {
    type: string;
    payload?: any;
}

export interface GameData {
    members: User[];
}

export interface ServerData {
    onlineUsers: User[];
    gameData: GameData;
}

export interface APIResponse {
    data?: any;
    error?: string;
}

export interface FireBaseResponse {
    result?: any;
    error?: string;
};
