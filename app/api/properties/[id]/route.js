import connectDb from "@/config/database";
import Property from "@/models/Property";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";

//GET /api/properties/:id

export const GET = async (req, { params }) => {
  try {
    await connectDb();

    const property = await Property.findById(params.id);

    if (!property) {
      return new Response("Property not found.", { status: 404 });
    }

    return new Response(JSON.stringify(property), { status: 200 });
  } catch (err) {
    console.log(err.message);
    return new Response("Something went wrong!", { status: 500 });
  }
};

//DELETE /api/properties/:propertyId

export const DELETE = async (req, { params }) => {
  try {
    await connectDb();

    const propertyId = params.id;

    const sessionUser = await getServerSession(authOptions);

    const userId = sessionUser.user.id;

    //check for session
    if (!sessionUser || !userId) {
      return new Response("User id is required", { status: 401 });
    }

    //search for property in the data base to check if its found
    const property = await Property.findById(propertyId);

    //if property not found
    if (!property) {
      return new Response("Property not found.", { status: 404 });
    }

    //verify owner ship

    if (property.owner.toString() !== userId) {
      return new Response("unauthorized", { status: 401 });
    }

    //delete property
    await property.deleteOne();

    return new Response("Property Deleted", { status: 200 });
  } catch (err) {
    console.log(err.message);
    return new Response("Something went wrong!", { status: 500 });
  }
};

//PUT /api/properties/:propertyId

export const PUT = async (req, { params }) => {
  try {
    await connectDb();

    const sessionUser = await getServerSession(authOptions);

    //get user id // get property id

    const propertyId = params.id;
    const userId = sessionUser.user.id;

    if (!sessionUser || !userId) {
      return new Response("User id is required", { status: 401 });
    }

    const formData = await req.formData();

    //access amenities and images arrays

    const amenities = formData.getAll("amenities");

    //search for property in the data base to check if its found
    const existingProperty = await Property.findById(propertyId);

    //if property not found
    if (!existingProperty) {
      return new Response("Property not found.", { status: 404 });
    }

    //verify owner ship

    if (existingProperty.owner.toString() !== userId) {
      return new Response("unauthorized", { status: 401 });
    }

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

    //Update property

    const updatedProperty = await Property.findByIdAndUpdate(propertyId, propertyData);

    return new Response(JSON.stringify(updatedProperty), {
      status: 200,
    });
  } catch (err) {
    return new Response("Failed to update property.", { status: 500 });
  }
};
