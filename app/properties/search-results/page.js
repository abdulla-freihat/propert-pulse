"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import PropertyCard from "@/components/PropertyCard";
import Spinner from "@/components/spinner";
import PropertySearchForm from "@/components/PropertySearchForm";

const searchResultsPage = () => {
  const searchParams = useSearchParams();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(properties);

  const location = searchParams.get("location");
  const type = searchParams.get("propertyType");

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const res = await fetch(
          `/api/properties/search?location=${location}&propertyType=${type}`
        );

        if (res.status === 200) {
          const data = await res.json();
          setProperties(data);
        } else {
          setProperties([]);
        }
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [location, type]);

  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <section className="px-4 py-6 h-screen">
    <div className="bg-blue-600 p-2 max-w-3xl mx-auto rounded-md">
        <PropertySearchForm />

        </div>
      <div className="container-xl lg:container m-auto px-4 py-6">
      <Link href='/properties' className="flex items-center underline text-blue-500 hover:text-blue-600 gap-1"><FaArrowAltCircleLeft /> Back to properties </Link>
         <h1 className="text-2xl my-3">Search Results : </h1>
        {properties && properties.length === 0 ? (
          <p className="text-center font-bold text-lg">No search properties found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties &&
              properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default searchResultsPage;
