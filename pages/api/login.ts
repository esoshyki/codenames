import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "../../types/next";
import { databaseService } from "@/firebase/db";
import { User } from "@/types";
import { SocketActions } from "@/types/socket.actions";

export default async (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (req.method === "POST") {

    try {

      const user: User = req.body;
      const response = await databaseService.login(user);

      if (response.error) {
        return res.status(401).send(response.error);
      } else {
        res?.socket?.server?.io?.emit(SocketActions.CHANGE_ONLINE_USERS, response.result);
        res.end();
      }
 

    } catch (err: any) {

      return res.status(500).send(err.message || "Server Error");
    }

  };
};
