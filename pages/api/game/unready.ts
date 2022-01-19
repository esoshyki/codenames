import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "../../../types/next";

export default (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (req.method === "POST") {
    const user = req.body;
    res?.socket?.server?.io?.emit("user_unready", user);
    res.status(200).send("unready");
  };
};
