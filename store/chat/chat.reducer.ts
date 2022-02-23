import { IChat } from "@/types/chat";
import { Actions, IAction } from "@/types/actions";

const initialState: IChat = {
    messages: [],
    hidden: false,
};

const actions = Actions.chat;

const chatReducer = (state = initialState, { type, payload }: IAction) : IChat => {

    switch (type) {
        
        case actions.setChatHidden:
            return ({
                ...state,
                hidden: payload
            })

        case actions.AddMessage:
            return ({
                ...state,
                messages: [...state.messages, payload]
            });

        case actions.RemoveMessage:
            return ({
                ...state,
                messages: state.messages.filter(message => message.id !== payload)
            })

        default:
            return state;
    }
};

export default chatReducer;
