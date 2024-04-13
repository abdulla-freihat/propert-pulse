import React from "react";
import {
  FaCheck,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaTimes,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const PropertyDetails = ({ property }) => {
  return (
    <main>
      <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
        <div className="text-gray-500 mb-4">{property.type}</div>
        <h1 className="text-3xl font-bold mb-4">{property.name}</h1>
        <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
          <FaLocationDot className=" text-lg text-orange-700 mr-2" />
          <p className="text-orange-700">
            {property.location.street}
            {property.location.city},{property.location.state}{" "}
            {property.location.zipcode}
          </p>
        </div>

        <h3 className="text-lg font-bold my-6 bg-gray-800 text-white p-2">
          Rates & Options
        </h3>
        <div className="flex flex-col md:flex-row justify-around">
          <div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
            <div className="text-gray-500 mr-2 font-bold">Nightly</div>
            <div className="text-2xl font-bold">
              {property.rates.nightly ? (
                <div className="text-2xl font-bold text-blue-500">
                  ${property.rates.nightly.toLocaleString()}
                </div>
              ) : (
                <FaTimes className=" text-red-700" />
              )}
            </div>
          </div>
          <div className="flex items-center justify-center mb-4 pb-4 md:pb-0">
            <div className="text-gray-500 mr-2 font-bold">Weekly</div>

            {property.rates.weekly ? (
              <div className="text-2xl font-bold text-blue-500">
                ${property.rates.weekly.toLocaleString()}
              </div>
            ) : (
              <FaTimes className=" text-red-700" />
            )}
          </div>
          <div className="flex items-center justify-center mb-4 pb-4 md:pb-0">
            <div className="text-gray-500 mr-2 font-bold">Monthly</div>

            {property.rates.monthly ? (
              <div className="text-2xl font-bold text-blue-500">
                ${property.rates.monthly.toLocaleString()}
              </div>
            ) : (
              <FaTimes className=" text-red-700" />
            )}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h3 className="text-lg font-bold mb-6">Description & Details</h3>
        <div className="flex justify-center gap-4 text-blue-500 mb-4 text-xl space-x-9">
          <p className="flex gap-2 items-center">
            <FaBed className="" /> {property.beds}
            <span className="hidden sm:inline">Beds</span>
          </p>
          <p className="flex gap-2 items-center">
            <FaBath className="" /> {property.baths}
            <span className="hidden sm:inline">Baths</span>
          </p>
          <p className="flex gap-2 items-center">
            <FaRulerCombined className="" /> {property.square_feet}
            <span className="hidden sm:inline">sqft</span>
          </p>
        </div>

        <p className="text-gray-500 mb-4">{property.description}</p>
      </div>

       {property.amenities.length !==0 && 
       
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h3 className="text-lg font-bold mb-6">Amenities</h3>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 list-none space-y-2">
          {property.amenities.map((amenity, index) => (
            <li key={index} >
              <FaCheck className=" text-green-600 inline-block mr-2 " /> {amenity}
            </li>
          ))}
        </ul>
      </div>
       
       }
     
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <div id="map"></div>
      </div>
    </main>
  );
};

export default PropertyDetails;
