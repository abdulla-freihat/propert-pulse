import connectDb from "@/config/database";
import Message from "@/models/Message";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";

export const dynamic = "force-dynmic";

//PUT /api/messages/messageId

export const PUT = async (req, { params }) => {
  try {
    await connectDb();

    const { id } = params;

    const sessionUser = await getServerSession(authOptions);

    const userId = sessionUser.user.id;

    if (!sessionUser || !userId) {
      return new Response("User id is required", { status: 401 });
    }

    const message = await Message.findById(id);

    if (!message) {
      return new Response( "Message Not Found " , {
        status: 404,
      });
    }

    //verify ownership
    if (message.recipient.toString() !== userId) {
      return new Response( "Unauthorized ", {
        status: 401,
      });
    }



    // Update message to read/unread  depending on the current status


    message.read = !message.read

    await message.save();



    return new Response(JSON.stringify(message), { status: 200 });






  } catch (err) {
    return new Response("Something went wrong", { status: 500 });
  }
};

//DELETE /api/messages/messageId

export const DELETE = async (req, { params }) => {
  try {
    await connectDb();

    const { id } = params;

    const sessionUser = await getServerSession(authOptions);

    const userId = sessionUser.user.id;

    if (!sessionUser || !userId) {
      return new Response("User id is required", { status: 401 });
    }

    const message = await Message.findById(id);

    if (!message) {
      return new Response(JSON.stringify({ message: "Message Not Found " }), {
        status: 404,
      });
    }

    //verify ownership
    if (message.recipient.toString() !== userId) {
      return new Response(JSON.stringify({ message: "Unauthorized " }), {
        status: 401,
      });
    }

    await message.deleteOne();

    return new Response("Message deleted successfully", { status: 200 });
  } catch (err) {
    return new Response("Something went wrong", { status: 500 });
  }
};
