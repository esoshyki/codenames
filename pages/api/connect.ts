import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "../../types/next";
import { databaseService } from "@/firebase/db";

export default async (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (req.method === "POST") {
    const user = req.body;
    await databaseService.addOnlineUser(user);
    res.status(200).json(user);
  };
};
