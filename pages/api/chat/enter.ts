import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "../../../types/next";

export default (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (req.method === "POST") {
    const user = req.body;

    res?.socket?.server?.io?.emit("adduser", user);

    res.status(201).json(user);
  }
};
