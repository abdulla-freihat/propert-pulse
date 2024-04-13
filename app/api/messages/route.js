import connectDb from "@/config/database";
import Message from "@/models/Message";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";

export const dynamic = "force-dynamic";





//GET api/message


export const GET = async (req)=>{


   try{

     await connectDb();

     const sessionUser = await getServerSession(authOptions);

     const userId = sessionUser.user.id;

     if (!sessionUser || !userId) {
      return new Response("User id is required", { status: 401 });
    }


     const messages = await Message.find({recipient : userId })
     .sort({createdAt :-1})//sort messages in asc order
     .populate('sender' ,'username')
     .populate('property' , 'name')




     return new Response(
      JSON.stringify(messages),
      {
        status: 200,
      }
    );


   }catch(err){

    return new Response("Something went wrong", { status: 500 });

   }

   
}





//POST api/message

export const POST = async (req) => {
  try {
    await connectDb();

    const { name, phoneNumber, email, message, property, recipient } = await  req.json();

    const sessionUser = await getServerSession(authOptions);

    const userId = sessionUser.user.id;

    const {user} = sessionUser;

    if (!sessionUser || !userId) {
      return new Response(JSON.stringify({ message: "You must be logged in to send a message " }), { status: 401 });
    }

    // can not send message to self

    if (userId === recipient) {
      return new Response(
        JSON.stringify({ message: "Can not send the message to yourself " }),
        { status: 400 }
      );
    }

    //create message

    const newMessage = new Message({
      name,
      phoneNumber,
      email,
      property,
      message,
      recipient,
      sender: userId,
    });

    await newMessage.save();

    return new Response(
      JSON.stringify({ message: "Message sent successfully" }),
      {
        status: 200,
      }
    );
  } catch (err) {
    return new Response("Failed to send  a message!", { status: 500 });
  }
};
