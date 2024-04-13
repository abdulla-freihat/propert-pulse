import React from "react";
import Link from "next/link";
import Image from "next/image";
import Spinner from "./spinner";
import {toast } from 'react-toastify';


const UserProfileListings = ({ userProperties, loading }) => {



  const handleDeleteProperty = async (propertyId) => {
    const confirmed = window.confirm(
      "Are you sure that wo want to delete this property?"
    );

    if (!confirmed) return;


    try{

      const res = await fetch(`/api/properties/${propertyId} ` , {method :'DELETE'})

        if(res.status=== 200){

               userProperties.filter((property) => property._id !== propertyId)
               toast.success('Property Deleted.')
               
        }
       
    }catch(err){
       
      toast.error('Failed to delete Property , please try later')

    }
  };

  return (
    <div className="md:w-3/4 md:pl-4">
      <h2 className="text-xl font-semibold mb-4">Your Listings</h2>

      {!loading && userProperties.length === 0 && (
        <div>
          <p>You have no properties yet.</p>
          <Link
            href="/properties/add"
            className="underline text-blue-500 hover:text-blue-600"
          >
            Add Properties from here
          </Link>
        </div>
      )}

      {loading ? (
        <Spinner loading={loading} />
      ) : (
        userProperties &&
        userProperties.map((property) => (
          <div className="mb-10" key={property._id}>
            <Link href={`/properties/${property._id}`}>
              <Image
                className="h-32 w-full rounded-md object-cover"
                src={property.images[0]}
                alt="Property 1"
                width={0}
                height={0}
                sizes="100vw"
                priority={true}
              />
            </Link>
            <div className="mt-2">
              <p className="text-lg font-semibold">{property.name}</p>
              <p className="text-gray-600">
                Address: {property.location.street} {property.location.city}{" "}
                {property.location.state} {property.location.zipcode}
              </p>
            </div>
            <div className="mt-2">
              <Link
                href={`/properties/${property._id}/edit`}
                className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDeleteProperty(property._id)}
                className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                type="button"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default UserProfileListings;
