import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "../../../types/next";
import { SocketActions } from "socket/types";
import { IFBUserData } from "@/store/types";
import { databaseService } from "@/firebase/db";

export default async (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (req.method === "POST") {
    const user : IFBUserData = req.body;

    await databaseService.removeGameMember(user.socketId);

    res?.socket?.server?.io?.emit(SocketActions.USER_UNREADY);
    res.status(200).send("unready");
  };
};
