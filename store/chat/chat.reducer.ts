import { ReduxAction } from "@/types";
import { IChat } from "@/types/chat";
import { Actions } from "@/types/actions";

const initialState: IChat = {
    messages: [],
    hidden: false,
};

const actions = Actions.chat;

const chatReducer = (state = initialState, { type, payload }: ReduxAction) : IChat => {

    switch (type) {
        
        case actions.setChatHidden:
            return ({
                ...state,
                hidden: payload
            })

        case actions.addChatMessageResponse:
            return ({
                ...state,
                messages: [...state.messages, payload]
            });

        default:
            return state;
    }
};

export default chatReducer;
