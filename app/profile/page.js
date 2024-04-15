"use client";

import Image from "next/image";

import { useSession } from "next-auth/react";
import profileDefault from "@/assets/images/profile.png";
import UserProfileListings from "@/components/UserProfileListings";
import { useEffect, useState } from "react";
import { fetchUserProperties } from "@/utils/requests";

const ProfilePage = () => {
  const { data: session } = useSession();

  const [userProperties, setUserProperties] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!session?.user?.id) {
          return;
        }

        const properties = await fetchUserProperties(session?.user?.id);

        setUserProperties(properties);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.id) {
      fetchData();
    }
  }, [session]);

  return (
    <section className="">
      <div className="container m-auto py-24">
        <div className=" px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="md:w-1/4 mx-20 mt-10">
              <div className="mb-4">
                <Image
                  className="h-32 w-32  rounded-full mx-auto md:mx-0"
                  src={session?.user?.image || profileDefault}
                  alt="User"
                  width={0}
                  height={0}
                  sizes="100vw"
                  priority={true}
                />
              </div>
              <h2 className="text-2xl mb-4">
                <span className="font-bold block">Name: </span>{" "}
                {session?.user?.name}
              </h2>
              <h2 className="text-2xl">
                <span className="font-bold block">Email: </span>{" "}
                {session?.user?.email}
              </h2>
            </div>

            <UserProfileListings userProperties={userProperties}  loading={loading}/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
