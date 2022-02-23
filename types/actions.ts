enum ConnectionActions {
    socketConnected = "Connection/Socket-Connected",
    socketDisconnected = "Connection/Socket-Disconnected",
    userLogged = "Connection/User-Logged",
    setUserName = "Connection/Set-User-Name",
    setSocketId = "Connection/Set-Socket-Id",
    updateOnlineUsers = "Connection/Update-Online-Users",
    setError = "Connection/Set-Error",
    Reset = "Connection/Reset",
    SetCurrentUserTeam = "Connection/Set-Current-User-Team",
    SetCurrentUserLeader = "Connection/Set-Current-User-Leader",
    SetCurrentUserReady = "Connection/Set-Current-User-Ready",
    SetCurrentUserCollectionVote = "Connection/Set-Current-User-Collection-Vote",
};

enum AppActions {
    setAppStage = "App/Set-App-Stage",
    setAppError = "App/Set-App-Error",
    ChangeAppStageRequest = "App/Change-App-Stage-Request",
    RestartRequest = "App/Restart-Request",
    Restart = "App/Restart",
    Reset = "App/Reset",
    SetLocale = "App/Set-Locale",
    SetLayoutEffect = "App/Set-Layout-Effect",
};

enum ChatActions {
    addChatMessageRequest = "Chat/Add-Message-Request",
    addChatMessageResponse = "Chat/Add-Message-Response",
    setChatHidden = "Chat/Set-Hidden",
    Reset = "Chat/Reset",
    AddMessage = "Chat/Add-Message",
    RemoveMessage = "Chat/Remove-Message"
};

enum GameActions {
    StartGameRequest = "Game/Start-Game-Request",
    Reset = "Game/Reset",
    SetGameMembers = "Game/Set-Game-Members",
    UpdateGameMembersRequest = "Game/Update-Game-Members-Request",
    ToggleTeamRequest = "Game/Toggle-Team-Request",
    ToggleLeaderRequest = "Game/Toggle-Leader-Request",
    ToggleReadyRequest = "Game/Toggle-Ready-Request",
    ToggleCollectionVoteRequest = "Game/Toggle-Collection-Vote-Request",
    SetRedTeam = "Game/Set-Red-Team",
    SetBlueTeam = "Game/Set-Blue-Team",
    AllReadyRequest = "Game/All-Ready-Request",
    SetField = "Game/Set-Field",
    SetRound = "Game/Set-Round",
    SetFieldRequest = "Game/Set-Field-Request",
    MakeMysteryRequest = "Game/Make-Mystery-Request",
    SetSelectedCards = "Game/Set-Selected-Cards",
    SetMystery = "Game/Set-Mystery",
    MakeVoteRequest = "Game/Make-Vote-Request",
    MakePassRequest = "Game/Male-Pass-Request",
    AllVotesDoneRequest = "Game/All-Votes-Done-Request",
    SetWinnerVote = "Game/Set-Winner-Vote",
    EneGameRequest = "Game/End-Game-Request"
}

export const Actions = {
    connection: ConnectionActions,
    app: AppActions,
    chat: ChatActions,
    game: GameActions,
};

export interface IAction {
    type: string;
    payload?: any
};