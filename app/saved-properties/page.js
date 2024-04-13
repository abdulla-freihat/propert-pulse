"use client";

import { useState, useEffect } from "react";
import Spinner from "@/components/spinner";
import { toast } from "react-toastify";
import PropertyCard from "@/components/PropertyCard";

const SavedProperties = () => {
  const [properties, setProperties] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedProperties = async () => {
      try {
        const res = await fetch("/api/bookmark");

        if (res.status === 200) {
          const data = await res.json();


          setProperties(data);
          
        } else {
          console.log(res.statusText);
          toast.error("Failed to fetch saved properties");
        }
      } catch (err) {
        console.log(err.message);
        toast.error("Failed to fetch saved properties");
      } finally {
        setLoading(false);
      }
    };

    fetchSavedProperties();
  }, []);

  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <section className="px-4 py-6 h-screen">
      <h1 class="text-3xl font-bold mb-6">Your Saved Properties</h1>

      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (
          <p className="text-center font-bold text-lg">
            No saved properties found.
          </p>
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

export default SavedProperties;
