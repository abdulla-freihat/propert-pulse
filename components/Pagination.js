import React from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Pagination = ({ page, pageSize, totalItems, onPageChange }) => {

    const router = useRouter();

  const totalPages = Math.ceil(totalItems / pageSize);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };


  useEffect(() => {
    router.push(`/properties?page=${page}`);
  }, [page, router]);

  return (
    <section className="container mx-auto flex justify-center items-center my-8">
      <button
        className={` ${
          page === 1 ? "opacity-45" : ""
        }  mr-2 px-2 py-1 border border-gray-300 rounded`}
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        Previous
      </button>
      <span className="mx-2">
        Page {page} of {totalPages}
      </span>
      <button
        onClick={() => handlePageChange(page + 1)}
        className={`ml-2 px-2 py-1 border border-gray-300 rounded ${
          page === totalPages ? "opacity-45" : ""
        }`}
        disabled={page === totalPages}
      >
        Next
      </button>
    </section>
  );
};

export default Pagination;
