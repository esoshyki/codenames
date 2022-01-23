import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "../../types/next";
import { databaseService } from "@/firebase/db";
import { SocketActions } from "socket/types";
import { IFBUserData } from "@/store/types";

export default async (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (req.method === "POST") {

    try {
      const user: IFBUserData = req.body;
      await databaseService.addOnlineUser(user);
 
      res?.socket?.server?.io?.emit(SocketActions.user_connected, user);
  
      res.status(200).send("ok")
    } catch (err: any) {

      res.send(err.message);
    }

  };
};
