import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
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

  // Inline AnimatedBlogCard component
  const AnimatedBlogCard = ({ children }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, {
      once: false,
      amount: 0.3,
    });

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={{
          opacity: isInView ? 1 : 0.5,
          y: isInView ? 0 : 20,
          filter: isInView ? "blur(0px)" : "blur(2px)",
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full"
      >
        {children}
      </motion.div>
    );
  };

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

            return (
              <AnimatedBlogCard key={blog._id}>
                <div className="border rounded-lg p-4 shadow bg-white">
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
              </AnimatedBlogCard>
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
