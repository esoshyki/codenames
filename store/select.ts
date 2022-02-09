import { appSelector } from './app/app.selectors';
import { connectionSelector } from './connection/connection.selectors';

export const select = {
    app: appSelector,
    connection: connectionSelector
};