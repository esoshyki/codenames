import { IState } from "@/types";

const chatIsHidden = (state: IState) => state.chat.hidden;
const chatMessages = (state: IState) => state.chat.messages;

export const chatSelectors = {
    chatIsHidden,
    chatMessages
};