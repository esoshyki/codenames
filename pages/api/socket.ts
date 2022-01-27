import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "../../types/next";
import { creatseServerSocket } from "@/socket/socket.server";

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

        const io = creatseServerSocket(res);

 
        res.socket.server.io = io;
    }

    res.end();
}
