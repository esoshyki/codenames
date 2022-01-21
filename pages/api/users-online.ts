import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "../../types/next";
import { databaseService } from "@/firebase/db";

export default async (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (req.method === "GET") {
    const users = await databaseService.getOnlineUsers();
    res?.socket?.server?.io?.emit("update-online-users", users);
    res.status(200).json("ok");
  };
};
