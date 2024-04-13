import connectDb from "@/config/database";
import Property from "@/models/Property";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";
import cloudinary from "@/config/cloudinary";
//GET api/properties

export const GET = async (req) => {
  try {
    await connectDb();



    //pagination logic
    const page = req.nextUrl.searchParams.get('page') || 1;
    const pageSize = req.nextUrl.searchParams.get('pageSize') || 3;
    const skip = (page - 1 ) * pageSize;
    const total = await Property.countDocuments({});

    const properties = await Property.find({}).skip(skip).limit(pageSize);

       const result={
             total,
             properties
       }

    if (!properties) {
      return new Response("Properties not found.", { status: 404 });
    }

    return new Response(JSON.stringify({properties , total}), { status: 200 });
  } catch (err) {
    return new Response("Something went wrong!", { status: 500 });
  }
};

//Post api/properties

export const POST = async (req) => {
  try {
    await connectDb();

    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    //get user id

    const userId = session.user.id;

    const formData = await req.formData();

    //access amenities and images arrays

    const amenities = formData.getAll("amenities");
    const images = formData
      .getAll("images")
      .filter((image) => image.name !== "");

    const propertyData = {
      type: formData.get("type"),
      name: formData.get("name"),
      description: formData.get("description"),
      location: {
        street: formData.get("location.street"),
        city: formData.get("location.city"),
        state: formData.get("location.state"),
        zipcode: formData.get("location.zipcode"),
      },

      beds: formData.get("beds"),
      baths: formData.get("baths"),
      square_feet: formData.get("square_feet"),
      amenities,
      rates: {
        nightly: formData.get("rates.nightly"),
        weekly: formData.get("rates.weekly"),
        monthly: formData.get("rates.monthly"),
      },
      seller_info: {
        name: formData.get("seller_info.name"),
        email: formData.get("seller_info.email"),
        phone: formData.get("seller_info.phone"),
      },

      owner: userId,
    };

    //upload images to cloudinary

    const imageUploadPromises = [];

    for (const image of images) {
      const imageBuffer = await image.arrayBuffer();

      const imageArray = Array.from(new Uint8Array(imageBuffer));

      const imageData = Buffer.from(imageArray);

      //Convert  the image  data to base 64

      const imageBase64 = imageData.toString("base64");

      //make request to upload to cloudinary

      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        {
          folder: "propertyPulse",
        }
      );

      imageUploadPromises.push(result.secure_url);

      //wait for all images to upload

      const uploadedImages = await Promise.all(imageUploadPromises);

      //add uploaded images to the propertyData object

      propertyData.images = uploadedImages;
    }

    const newProperty = new Property(propertyData);

    await newProperty.save();

    return Response.redirect(
      `${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`
    );

    /*return new Response(JSON.stringify({ message: "Success" }), {
      status: 200,
    });*/
  } catch (err) {
    return new Response("Failed to add property.", { status: 500 });
  }
};




