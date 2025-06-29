import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import BlogPost from "../BlogPost/BlogPost";
import { useUser } from "../../CustomProvider/userContext";
import useBloodDonors from "../../../../hooks/useBloodDonners";
import useBlogs from "../../../../hooks/useBlogs";
import { FaComment, FaRegCircleUser } from "react-icons/fa6";
import { AiFillLike } from "react-icons/ai";
import { useForm } from "react-hook-form";

const Blogs = () => {
  const { userEmail } = useUser();
  const [users] = useBloodDonors();
  const [blogs] = useBlogs();
  const [currentUser, setCurrentUser] = useState(null);
  const [showPostModal, setShowPostModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [likedPosts, setLikedPosts] = useState({});
  const [activePostId, setActivePostId] = useState(null);

  const handleLike = async (postId) => {
    if (likedPosts[postId]) return;
    try {
      const res = await fetch(
        "http://localhost:5000/api/v1/likes/create-like",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: currentUser._id,
            postId: postId,
          }),
        }
      );
      if (res.ok) {
        setLikedPosts((prev) => ({
          ...prev,
          [postId]: true,
        }));
      } else {
        const data = await res.json();
        console.error("Error liking post:", data.message);
      }
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  const onSubmitComment = async (data) => {
    if (!activePostId || !currentUser?._id) return;

    try {
      const res = await fetch(`http://localhost:5000/api/v1/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: currentUser._id,
          comment: data.comment,
          postId: activePostId, // Use selected post ID
        }),
      });

      if (res.ok) {
        reset();
        setShowCommentModal(false);
        setActivePostId(null); // Clear post ID
      }
    } catch (err) {
      console.error("Error submitting comment:", err);
    }
  };

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
                <div className="w-[80%] mx-auto mt-3">
                  <div className="flex justify-between">
                    <button
                      onClick={() => handleLike(blog._id)}
                      className={`text-2xl ${
                        likedPosts[blog._id]
                          ? "text-blue-500"
                          : "text-gray-700 hover:text-blue-400"
                      }`}
                    >
                      <AiFillLike />
                    </button>

                    {/* <button
                      onClick={() => {
                        setActivePostId(blog._id); // Set post ID here
                        setShowCommentModal(true);
                      }}
                      className="text-2xl text-gray-700 hover:text-blue-400"
                    >
                      <FaComment />
                    </button> */}
                  </div>

                  {/* Comment Modal */}
                  {showCommentModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                      <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
                        <button
                          onClick={() => setShowCommentModal(false)}
                          className="absolute top-2 right-3 text-2xl text-gray-500 hover:text-black"
                        >
                          &times;
                        </button>
                        <h2 className="text-lg font-semibold mb-4">
                          Add a Comment
                        </h2>
                        <form
                          onSubmit={handleSubmit(onSubmitComment)}
                          className="space-y-4"
                        >
                          <textarea
                            {...register("comment", { required: true })}
                            rows="4"
                            className="w-full border p-2 rounded"
                            placeholder="Write your comment..."
                          />
                          <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                          >
                            Submit Comment
                          </button>
                        </form>
                      </div>
                    </div>
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
