import connectDb from "@/config/database";
import Message from "@/models/Message";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";

export const dynamic = "force-dynmic";

//GET /api/messages/unread-count

export const GET = async (req) => {
  try {
    await connectDb();

    const sessionUser = await getServerSession(authOptions);

    const userId = sessionUser.user.id;

    if (!sessionUser || !userId) {
      return new Response("User id is required", { status: 401 });
    }

    const count = await Message.countDocuments({
      recipient: userId,
      read: false,
    });

    return new Response(JSON.stringify(count), {
      status: 200,
    });
  } catch (err) {
    return new Response("Something went wrong", { status: 500 });
  }
};
