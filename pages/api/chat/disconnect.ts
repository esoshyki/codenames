import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "../../../types/next";

export default function disconnect (req: NextApiRequest, res: NextApiResponseServerIO) {
  if (req.method === "POST") {
    const user = req.body;

    res?.socket?.server?.io?.emit("disconnect_user", user);

    res.status(200).send("disconnected");
  }
};
