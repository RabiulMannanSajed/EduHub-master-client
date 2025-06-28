import React, { useEffect, useState } from "react";
import BlogPost from "../BlogPost/BlogPost";
import { useUser } from "../../CustomProvider/userContext";
import useBloodDonors from "../../../../hooks/useBloodDonners";
import { FaRegImage } from "react-icons/fa"; // optional image icon

const Blogs = () => {
  const { userEmail } = useUser();
  const [users] = useBloodDonors();
  const [currentUser, setCurrentUser] = useState(null);
  const [showPostModal, setShowPostModal] = useState(false);

  useEffect(() => {
    if (userEmail && users?.data?.length > 0) {
      const foundUser = users.data.find((user) => user?.email === userEmail);
      setCurrentUser(foundUser || null);
    }
  }, [userEmail, users]);

  return (
    <div className="p-4 max-w-xl mx-auto">
      {/* Fake input box like Facebook */}
      <div
        onClick={() => setShowPostModal(true)}
        className="flex items-center gap-3 p-3 border rounded-lg shadow cursor-pointer hover:bg-gray-100"
      >
        {/* User profile pic or placeholder */}
        <img
          src={currentUser?.photoUrl || "https://via.placeholder.com/40"}
          alt={currentUser?.name || "User"}
          className="w-10 h-10 rounded-full object-cover"
        />
        {/* Fake input text */}
        <div className="flex-1 text-gray-500">
          What’s on your mind, {currentUser?.name || "User"}?
        </div>
        {/* Optional image icon */}
      </div>

      {/* BlogPost modal */}
      {showPostModal && <BlogPost onClose={() => setShowPostModal(false)} />}

      {/* Your blog feed */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">All Blogs</h2>
        <p>Here all blogs...</p>
      </div>
    </div>
  );
};

export default Blogs;
