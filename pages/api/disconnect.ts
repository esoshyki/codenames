import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "../../types/next";
import { databaseService } from "@/firebase/db";
import { SocketActions } from "socket/types";

export default async (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (req.method === "POST") {
    const user = req.body;
    await databaseService.removeUserFromOnline(user);

    res?.socket?.server?.io?.emit(SocketActions.user_disconnected);
    res.status(200).json(user);
  };
};
