import { appSelector } from './app/app.selectors';
import { chatSelectors } from './chat/chat.selectors';
import { connectionSelector } from './connection/connection.selectors';
import { gameSelectors } from './game/game.selectors';

export const select = {
    app: appSelector,
    connection: connectionSelector,
    chat: chatSelectors,
    game: gameSelectors
};