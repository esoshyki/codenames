import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "../../../types/next";
import { SocketActions } from "socket/types";
import { databaseService } from "@/firebase/db";
import { IFBUserData } from "@/store/types";

export default async (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (req.method === "POST") {
    const user: IFBUserData = req.body;

    await databaseService.addGameMember(user);

    res?.socket?.server?.io?.emit(SocketActions.USER_READY);
    res.status(200).send("ready");
  };
};
