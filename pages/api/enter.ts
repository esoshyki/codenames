import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "../../types/next";
import { databaseService } from "@/firebase/db";

export default async (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (req.method === "POST") {
    const user = req.body;
    await databaseService.addOnlineUser(user);

    const users = await databaseService.getOnlineUsers();
    res?.socket.server?.io?.emit("change_online_users", users);
    res?.socket?.server?.io?.emit("enter", user);

    res.status(200).send("ok");
  };
};
