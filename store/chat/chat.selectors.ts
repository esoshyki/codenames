import { IState } from "@/types";

export const getChatHidden = (state: IState) => state.chat.hidden;
export const getChatMessages = (state: IState) => state.chat.messages;
