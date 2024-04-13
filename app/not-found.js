import React from "react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col gap-3">
      <p className="font-bold text-7xl text-center">404 </p>
        <p className="font-bold text-2xl">Page Not Found</p>
        <Link href='/' className="bg-blue-500 text-white text-center hover:bg-blue-600 rounded-md  p-2">Go Home</Link>
      </div>
    </div>
  );
};

export default NotFound;
