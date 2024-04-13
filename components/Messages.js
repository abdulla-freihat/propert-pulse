"use client";

import { useState, useEffect } from "react";
import Spinner from "./spinner";
import Message from "./Message";
import { toast } from "react-toastify";
import { useGlobalContext } from "@/context/GlobalContext";


const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setUnreadCount} = useGlobalContext();


  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await fetch("/api/messages");

        if (res.status === 200) {
          const data = await res.json();

          setMessages(data);


        }
      } catch (err) {
        console.log("Eroor fetching messages: ", err);
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, []);

  const handleDeleteClick = async (id) => {
    try {
      const res = await fetch(`/api/messages/${id}`, {
        method: "DELETE",
      });

      if (res.status === 200) {
        setMessages((prevMessages) =>
          prevMessages.filter((message) => message._id !== id)
        );

        setUnreadCount(prevCount => prevCount -1)


        toast.success("Message deleted successfully");
      }
    } catch (err) {
      console.log("Failed to delete the message", err.message);
    }
  };

  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <section className="bg-blue-50 ">
      <div className="container m-auto py-24 max-w-6xl">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Messages</h1>

          <div className="space-y-4">
            {messages.length === 0 ? (
              <p>You have no messages </p>
            ) : (
              messages &&
              messages.map((message) => (
                <Message
                  message={message}
                  handleDeleteClick={handleDeleteClick}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Messages;
