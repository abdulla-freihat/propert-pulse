import connectDb from "@/config/database";
import Property from "@/models/Property";

//GET api/properties/:userId

export const GET = async (req , {params}) => {
  try {
    await connectDb();

    const userId = params.userId; // params.userId , the userId is the name of the folder

    if (!userId) {
      return new Response("User id is required!", { status: 400 });
    }

    const properties = await Property.find({ owner: userId });

    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (err) {
    return new Response("Something went wrong!", { status: 500 });
  }
};
