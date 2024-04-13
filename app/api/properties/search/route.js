import connectDb from "@/config/database";
import Property from "@/models/Property";

//GET /api/properties/search

export const GET = async (req) => {
  try {
    await connectDb();
    const { searchParams } = new URL(req.url);
    const location = searchParams.get("location");
    const type = searchParams.get("propertyType");

    const locationPattern = new RegExp(location, "i");

    //Match location pattern
     let query = {
      $or: [

        { name: locationPattern }, 
        { description: locationPattern },
        {'location.street' : locationPattern},
        {'location.city' : locationPattern},
        {'location.state' : locationPattern},
        {'location.zipcode' : locationPattern}

    
    ],
    };


    //only check if for property if  its not 'All'
    if(type && type !== 'All'){

         const typePattern = new RegExp(type , 'i');

         query.type = typePattern;
    }


    const properties = await Property.find(query);


    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (err) {
    return new Response("Failed to add property.", { status: 500 });
  }
};
