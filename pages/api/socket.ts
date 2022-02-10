import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "../../types/next";
import { createIo } from "@/socket/server";
import { Server } from "@/socket/data";

export const config = {
    api: {
        bodyParser: false
    }
};

export default async function socketIO(
    req: NextApiRequest,
    res: NextApiResponseServerIO
) {
    if (!req) return;

    if (!res.socket.server.io) {

        const io = createIo(res);
 
        res.socket.server.io = io;
    }

    res.end();
}
