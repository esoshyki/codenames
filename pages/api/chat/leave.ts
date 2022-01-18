import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "../../../types/next";

export default (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (req.method === "POST") {
    // get message
    const user = req.body;

    // dispatch to channel "message"
    res?.socket?.server?.io?.emit("leavechat", user);

    // return message
    res.status(200).json(user);
  }
};