"use client";

import { toast } from "react-toastify";
import { useState } from "react";
import { useGlobalContext } from "@/context/GlobalContext";

const Message = ({ message, handleDeleteClick }) => {
  const [isRead, setIsRead] = useState(message.read);

  const { setUnreadCount} = useGlobalContext();

  const handleReadClick = async () => {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: "PUT",
      });

      if (res.status === 200) {
        const { read } = await res.json();

        setIsRead(read);

        setUnreadCount(prevCount => (read ? prevCount -1  : prevCount +1  ))

        if (read) {
          toast.success("Mark as read");
        } else {
          toast.success("Mark as new");
        }
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <div
        key={message._id}
        className="relative bg-white dark:bg-gray-800 p-4 rounded-md shadow-md border border-gray-200"
      >
        {!isRead && (
          <div className="absolute top-2 right-2  bg-yellow-500  text-white px-2  py-1  rounded-md ">
            {" "}
            New{" "}
          </div>
        )}
        <h2 className="text-xl mb-4">
          <span className="font-bold">Property Inquiry: </span>

          {message.property.name}
        </h2>
        <p className="text-gray-700">{message.message}</p>

        <ul className="mt-4">
          <li>
            <strong>Name: </strong> {message.sender.username}
          </li>

          <li>
            <strong>Reply Email: </strong>
            <a href={`mailto:${message.email}`} className="text-blue-500">
              {message.email}
            </a>
          </li>
          <li>
            <strong>Reply Phone: </strong>
            <a href={`tel:${message.phoneNumber}`} className="text-blue-500">
              {message.phoneNumber}
            </a>
          </li>
          <li>
            <strong>Received: </strong>
            {new Date(message.createdAt).toLocaleString()}
          </li>
        </ul>
        <button
          onClick={handleReadClick}
          className={`mt-4 mr-3 ${
            isRead ? "bg-gray-300" : "bg-blue-500 text-white"
          }  py-1 px-3 rounded-md`}
        >
          {isRead ? "Mark as new" : "Mark as read"}
        </button>
        <button
          onClick={() => handleDeleteClick(message._id)}
          className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Message;
