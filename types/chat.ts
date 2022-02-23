export interface IMessage {
    userName: string;
    message: string;
    id?: string;
};

export interface IChat {
    messages: IMessage[],
    hidden: boolean;
};