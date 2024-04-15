"use client";

import PropertyCard from "@/components/PropertyCard";
import { fetchProperties } from "@/utils/requests";
import Pagination from "@/components/Pagination";

import PropertySearchForm from "@/components/PropertySearchForm";
import { useState, useEffect } from "react";
import Spinner from "@/components/spinner";

const PropertyPage = async () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch(
          `/api/properties?page=${page}&pageSize=${pageSize}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch data.");
        }

        const data = await res.json();

        setProperties(data.properties);
        setTotalItems(data.total);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [page, pageSize]);

  const data = await fetchProperties(page, pageSize);
  


  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <section className="px-4 py-6">
      <div className="bg-blue-600 p-2 max-w-3xl mx-auto rounded-md">
        <PropertySearchForm />
      </div>

      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (
          <p className="text-center font-bold text-lg">No properties found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties &&
              properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
          </div>
        )}

        <Pagination
          page={page}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
};

export default PropertyPage;
