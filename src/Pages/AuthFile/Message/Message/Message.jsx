import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import useBloodDonors from "../../../../hooks/useBloodDonners";
import { FaRegCircleUser } from "react-icons/fa6";
import { useUser } from "../../CustomProvider/userContext";

const Message = ({ onClose }) => {
  const { userEmail } = useUser();
  const [users] = useBloodDonors();
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  const messagesContainerRef = useRef(null);
  const messagesEndRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (userEmail && users?.data?.length > 0) {
      const foundUser = users.data.find((user) => user?.email === userEmail);
      setCurrentUser(foundUser || null);
    }
  }, [userEmail, users]);

  const filteredUsers = users?.data?.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fetch messages
  useEffect(() => {
    if (!currentUser || !selectedUser) return;

    const fetchMessages = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/v1/messages/get-all-messages`
        );
        const data = await res.json();
        if (data.success) {
          setMessages(data.data);
        } else {
          console.error("Failed to fetch messages");
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 1000);
    return () => clearInterval(interval);
  }, [currentUser, selectedUser]);

  const isNearBottom = () => {
    const container = messagesContainerRef.current;
    if (!container) return false;
    const threshold = 150;
    const position = container.scrollTop + container.clientHeight;
    return container.scrollHeight - position < threshold;
  };

  useEffect(() => {
    if (isNearBottom() && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const onSubmit = async (data) => {
    if (!selectedUser) return;

    const messageData = {
      toID: selectedUser?._id,
      fromID: currentUser?._id,
      message: data.message,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/messages/create-message",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(messageData),
        }
      );

      if (response.ok) {
        console.log("Message sent!");
        reset();
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const filteredMessages = messages?.filter(
    (m) =>
      (m.fromID === currentUser?._id && m.toID === selectedUser?._id) ||
      (m.fromID === selectedUser?._id && m.toID === currentUser?._id)
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[90%] md:w-[70%] max-h-[100vh] overflow-y-auto p-4">
        <div className="flex justify-end mb-4">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-xl font-bold"
          >
            &times;
          </button>
        </div>

        <div className="flex">
          {/* User List */}
          <div className="w-[30%] border-r pr-2">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border rounded px-2 py-1 mb-2"
            />
            {filteredUsers?.map((user) => (
              <div
                key={user._id}
                onClick={() => setSelectedUser(user)}
                className={`flex items-center gap-4 p-3 rounded hover:bg-gray-100 cursor-pointer ${
                  selectedUser?._id === user._id ? "bg-gray-200" : ""
                }`}
              >
                {user.photoUrl ? (
                  <img
                    src={user.photoUrl}
                    alt={user.name}
                    className="w-12 h-12 object-cover rounded-full"
                  />
                ) : (
                  <FaRegCircleUser className="w-12 h-12 text-gray-400" />
                )}
                <div>
                  <p className="font-semibold">{user.name}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Chat */}
          <div className="flex flex-col flex-1 pl-4">
            {selectedUser ? (
              <>
                <div
                  ref={messagesContainerRef}
                  className="flex-1 flex flex-col gap-4 overflow-y-auto max-h-[70vh] pr-2"
                >
                  {filteredMessages?.length > 0 ? (
                    filteredMessages.map((m) => (
                      <div
                        key={m._id}
                        className={`chat ${
                          m.fromID === currentUser?._id
                            ? "chat-end"
                            : "chat-start"
                        }`}
                      >
                        <div className="chat-image avatar">
                          <div className="w-10 rounded-full">
                            {m.fromID === currentUser?._id ? (
                              <img
                                src={
                                  currentUser?.photoUrl ||
                                  "https://via.placeholder.com/40"
                                }
                                alt="You"
                              />
                            ) : selectedUser?.photoUrl ? (
                              <img
                                src={selectedUser.photoUrl}
                                alt={selectedUser.name}
                              />
                            ) : (
                              <FaRegCircleUser className="w-10 h-10 text-gray-400" />
                            )}
                          </div>
                        </div>
                        <div className="chat-header">
                          {m.fromID === currentUser?._id
                            ? "You"
                            : selectedUser?.name}
                          <time className="text-xs opacity-50 ml-2">
                            {new Date(m.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </time>
                        </div>
                        <div className="chat-bubble">{m.message}</div>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-500 text-center mt-4">
                      No messages yet. Start the conversation!
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex gap-2 mt-4 border-t pt-4"
                >
                  <input
                    {...register("message", { required: true })}
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 border rounded px-3 py-2 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Send
                  </button>
                </form>
              </>
            ) : (
              <div className="text-gray-500 text-center mt-10">
                Click a user to start chatting.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
