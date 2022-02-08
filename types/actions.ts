export enum actions {
    //APP
    updateOnlineUsersRequest = "App/Update-Online-Users-Request",
    updateOnlineUsersResponse = "Socket-Server/Update-Online-Users-Response",
    setOnlineUsers = "App/Set-Online-Users",
    changeAppStageQuery = "App/Change-App-Stage-Query",
    setAppStage = "App/Set-App-Stage",
    setSocketId = "App/Set-Socket-Id",
    setCurrentUserRequest = "App/Set-Current-User-Request",
    setCurrentUser = "App/Set-Current-User",
    setAppError = "App/Set-Error",
    
    //CHAT
    addChatMessageRequest = "Chat/Add-Message-Response",
    addChatMessageResponse = "Chat/Add-Message-Response",
    setChatHidden = "Chat/Set-Hidden",

    //GAME
    getFieldRequest = "Game/Get-Field-Request",
    getFieldResponse = "Game/Get-Field-Response",
    addPlayerToTeamRequest = "Game/Add-Player-To-Team-Request",
    addPlayerToTeamResponse = "Game/Add-Player-To-Team-Response",


};