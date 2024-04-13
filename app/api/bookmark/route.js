import User from "@/models/User";
import Property from "@/models/Property";

import connectDb from "@/config/database";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";

export const dynamic = "force-dynamic";

//GET api/bookmark

export const GET = async () => {
  try {
    await connectDb();

    const sessionUser = await getServerSession(authOptions);

    const userId = sessionUser.user.id;

    if (!sessionUser || !userId) {
      return new Response("User id is required", { status: 401 });
    }


    //find user in the databse
    const user = await User.findOne({ _id: userId });



     //Get users bookmarks

     const bookmarks = await Property.find({_id : {$in : user.bookmarks}});

     return new Response(JSON.stringify(bookmarks), {
      status: 200,
    });

  } catch {
    return new Response("Failed to bookmark property!", { status: 500 });
  }
};

//POST api/bookmark

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
    const user = await User.findOne({ _id: userId });

    //check if property is bookmarked
    let isBookmarked = user.bookmarks.includes(propertyId);

    let message;

    if (isBookmarked) {
      //if already bookmarked

      user.bookmarks.pull(propertyId);

      message = "Bookmark property removed successfully";
      isBookmarked = false;
    } else {
      //if not bookmarked

      user.bookmarks.push(propertyId);
      message = "Bookmark property added successfully";
      isBookmarked = true;
    }

    await user.save();

    return new Response(JSON.stringify({ message, isBookmarked }), {
      status: 200,
    });
  } catch (err) {
    return new Response("Failed to bookmark property!", { status: 500 });
  }
};
