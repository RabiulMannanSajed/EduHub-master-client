// import React, { useEffect, useState } from "react";
// import BlogPost from "../BlogPost/BlogPost";
// import { useUser } from "../../CustomProvider/userContext";
// import useBloodDonors from "../../../../hooks/useBloodDonners";
// import { FaRegImage } from "react-icons/fa"; // optional image icon
// import useBlogs from "../../../../hooks/useBlogs";

// const Blogs = () => {
//   const { userEmail } = useUser();
//   const [users] = useBloodDonors();
//   const [currentUser, setCurrentUser] = useState(null);
//   const [showPostModal, setShowPostModal] = useState(false);
//   const [blogs] = useBlogs();
//   useEffect(() => {
//     if (userEmail && users?.data?.length > 0) {
//       const foundUser = users.data.find((user) => user?.email === userEmail);
//       setCurrentUser(foundUser || null);
//     }
//   }, [userEmail, users]);

//   return (
//     <div className="p-4 max-w-xl mx-auto">
//       {/* Fake input box like Facebook */}
//       <div
//         onClick={() => setShowPostModal(true)}
//         className="flex items-center gap-3 p-3 border rounded-lg shadow cursor-pointer hover:bg-gray-100"
//       >
//         {/* User profile pic or placeholder */}
//         <img
//           src={currentUser?.photoUrl || "https://via.placeholder.com/40"}
//           alt={currentUser?.name || "User"}
//           className="w-10 h-10 rounded-full object-cover"
//         />
//         {/* Fake input text */}
//         <div className="flex-1 text-gray-500">
//           What’s on your mind, {currentUser?.name || "User"}?
//         </div>
//         {/* Optional image icon */}
//       </div>

//       {/* BlogPost modal */}
//       {showPostModal && <BlogPost onClose={() => setShowPostModal(false)} />}

//       {/* Your blog feed */}
//       <div className="mt-6">
//         <h2 className="text-xl font-semibold mb-4">All Blogs</h2>
//         <p>Here all blogs...</p>
//       </div>
//     </div>
//   );
// };

// export default Blogs;

// import React, { useEffect, useState } from "react";
// import BlogPost from "../BlogPost/BlogPost";
// import { useUser } from "../../CustomProvider/userContext";
// import useBloodDonors from "../../../../hooks/useBloodDonners";
// import useBlogs from "../../../../hooks/useBlogs";
// import { FaRegCircleUser } from "react-icons/fa6";

// const Blogs = () => {
//   const { userEmail } = useUser();
//   const [users] = useBloodDonors();
//   const [currentUser, setCurrentUser] = useState(null);
//   const [showPostModal, setShowPostModal] = useState(false);
//   const [blogs] = useBlogs();

//   useEffect(() => {
//     if (userEmail && users?.data?.length > 0) {
//       const foundUser = users.data.find((user) => user?.email === userEmail);
//       setCurrentUser(foundUser || null);
//     }
//   }, [userEmail, users]);

//   // Helper to get user info by userId

//   return (
//     <div className="p-4 max-w-xl mx-auto">
//       {/* Fake input box like Facebook */}
//       <div
//         onClick={() => setShowPostModal(true)}
//         className="flex items-center gap-3 p-3 border rounded-lg shadow cursor-pointer hover:bg-gray-100"
//       >
//         {/* User profile pic */}
//         {currentUser?.photoUrl ? (
//           <img
//             src={currentUser.photoUrl}
//             alt={currentUser.name}
//             className="w-10 h-10 rounded-full object-cover"
//           />
//         ) : (
//           <FaRegCircleUser className="w-10 h-10 text-gray-400" />
//         )}

//         <div className="flex-1 text-gray-500">
//           What’s on your mind, {currentUser?.name || "User"}?
//         </div>
//       </div>

//       {/* BlogPost modal */}
//       {showPostModal && <BlogPost onClose={() => setShowPostModal(false)} />}

//       {/* Blog feed */}
//       <div className="mt-6"></div>
//     </div>
//   );
// };

// export default Blogs;

import React, { useEffect, useState } from "react";
import BlogPost from "../BlogPost/BlogPost";
import { useUser } from "../../CustomProvider/userContext";
import useBloodDonors from "../../../../hooks/useBloodDonners";
import useBlogs from "../../../../hooks/useBlogs";
import { FaRegCircleUser } from "react-icons/fa6";

const Blogs = () => {
  const { userEmail } = useUser();
  const [users] = useBloodDonors();
  const [blogs] = useBlogs();
  const [currentUser, setCurrentUser] = useState(null);
  const [showPostModal, setShowPostModal] = useState(false);

  useEffect(() => {
    if (userEmail && users?.data?.length > 0) {
      const foundUser = users.data.find((user) => user?.email === userEmail);
      setCurrentUser(foundUser || null);
    }
  }, [userEmail, users]);

  console.log(blogs);
  return (
    <div className="p-4 max-w-xl mx-auto">
      {/* Fake input box */}
      <div
        onClick={() => setShowPostModal(true)}
        className="flex items-center gap-3 p-3 border rounded-lg shadow cursor-pointer hover:bg-gray-100"
      >
        {currentUser?.photoUrl ? (
          <img
            src={currentUser.photoUrl}
            alt={currentUser.name}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <FaRegCircleUser className="w-10 h-10 text-gray-400" />
        )}
        <div className="flex-1 text-gray-500">
          What’s on your mind, {currentUser?.name || "User"}?
        </div>
      </div>

      {/* Modal */}
      {showPostModal && <BlogPost onClose={() => setShowPostModal(false)} />}

      {/* Blog feed */}
      <div className="mt-6 flex flex-col gap-4">
        {blogs?.data?.length > 0 ? (
          blogs.data.map((blog) => {
            const user = users?.data?.find((u) => u._id === blog.userId);

            console.log("Matching blog:", blog);
            console.log("Matched user:", user);

            return (
              <div
                key={blog._id}
                className="border rounded-lg p-4 shadow bg-white"
              >
                <div className="flex items-center gap-3 mb-3">
                  {user?.photoUrl ? (
                    <img
                      src={user.photoUrl}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <FaRegCircleUser className="w-10 h-10 text-gray-400" />
                  )}
                  <span className="font-semibold">
                    {user?.name || "Unknown User"}
                  </span>
                </div>
                <p className="mb-3">{blog.caption}</p>
                {blog.photoUrl && (
                  <img
                    src={blog.photoUrl}
                    alt="Blog"
                    className="w-full rounded"
                  />
                )}
              </div>
            );
          })
        ) : (
          <p className="text-gray-500">No blogs yet.</p>
        )}
      </div>
    </div>
  );
};

export default Blogs;
