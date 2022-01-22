import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "../../types/next";
import { databaseService } from "@/firebase/db";
import { SocketActions } from '../../socket/types';

export default async (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (req.method === "GET") {
    console.log("UPDATE ONLINE USERS");
    const users = await databaseService.getOnlineUsers();

    console.log(users);
    res?.socket?.server?.io?.emit(SocketActions.update_online_users, users);
    res.status(200).json("ok");
  };
};
