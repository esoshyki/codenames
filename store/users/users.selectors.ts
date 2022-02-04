import { IState } from "../types";

export const getCurrentUser = (state: IState) => state.users.currentUser;