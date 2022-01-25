import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "../../types/next";
import { databaseService } from "@/firebase/db";
import { User } from "@/types";
import { SocketActions } from "@/types/socket.actions";

export default async (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (req.method === "POST") {

    try {

      const user: User = req.body;
      
      const response = await databaseService.updateUserData(user);

      if (response.error) {
        console.log(response.error)
      } else {
        res?.socket?.server?.io?.emit(SocketActions.UPDATE_SERVER_DATA, response.result);
        res.end();
      }
 

    } catch (err: any) {

        res.end();
    }

  };
};
