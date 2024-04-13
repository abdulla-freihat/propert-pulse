import User from "@/models/User";


import connectDb from "@/config/database";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";





export const dynamic = 'force-dynamic';

export const POST = async (req) => {
  try {
    await connectDb();

    //get user id // get property id

    const sessionUser = await getServerSession(authOptions);

    const { propertyId } = await req.json();
    
    const userId = sessionUser.user.id;



  

    if (!sessionUser || !userId) {
      return new Response("User id is required", { status: 401 });
    }

    //find user in the databse
    const user = await User.findOne({_id : userId});

    //check if property is bookmarked
    let isBookmarked = user.bookmarks.includes(propertyId);

   
 

 

     return new Response(JSON.stringify({isBookmarked}) , {status:200});

  } catch (err) {
    return new Response("Failed to bookmark property!", { status: 500 });
  }
};
