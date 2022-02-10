enum ConnectionActions {
    socketConnected = "Connection/Socket-Connected",
    socketDisconnected = "Connection/Socket-Disconnected",
    userLogged = "Connection/User-Logged",
    setUserName = "Connection/Set-User-Name",
    setSocketId = "Connection/Set-Socket-Id",
    updateOnlineUsers = "Connection/Update-Online-Users",
    setError = "Connection/Set-Error",
};

enum AppActions {
    setAppStage = "App/Set-App-Stage",
    setAppError = "App/Set-App-Error",
};

enum ChatActions {
    addChatMessageRequest = "Chat/Add-Message-Response",
    addChatMessageResponse = "Chat/Add-Message-Response",
    setChatHidden = "Chat/Set-Hidden",  
};

// export enum actions {
//     //APP
//     changeAppStageQuery = "App/Change-App-Stage-Query",
//     setAppStage = "App/Set-App-Stage",
//     setCurrentUserRequest = "App/Set-Current-User-Request",
//     setAppError = "App/Set-Error",
//     setUserConnected = "App/Set-User-Connected",
//     setUserDisconnected = "App/Set-User-Disconnected", 

//     //CONNECTION
//     socketConnected = "Connection/Socket-Connected",
//     socketDisconnected = "Connection/Socket-Disconnected",
//     userLogged = "Connection/User-Logged",
//     setUserName = "Connection/Set-User-Name",
//     setSocketId = "Connection/Set-Socket-Id",
    
//     //CHAT
//     addChatMessageRequest = "Chat/Add-Message-Response",
//     addChatMessageResponse = "Chat/Add-Message-Response",
//     setChatHidden = "Chat/Set-Hidden",

//     //GAME
//     getFieldRequest = "Game/Get-Field-Request",
//     getFieldResponse = "Game/Get-Field-Response",
//     addPlayerToTeamRequest = "Game/Add-Player-To-Team-Request",
//     addPlayerToTeamResponse = "Game/Add-Player-To-Team-Response",
// };

export const Actions = {
    connection: ConnectionActions,
    app: AppActions,
    chat: ChatActions
};

export interface IAction {
    type: string;
    payload?: any
};