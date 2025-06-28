import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useUser } from "../../CustomProvider/userContext";
import useBloodDonors from "../../../../hooks/useBloodDonners";
import { FaRegCircleUser } from "react-icons/fa6";
const img_hosting_token = "33706d1cbb5d148ebd01d844598979ba";

const BlogPost = ({ onClose }) => {
  const { userEmail } = useUser();
  const [users] = useBloodDonors();
  const [currentUser, setCurrentUser] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const { register, handleSubmit, reset, watch } = useForm();

  // Watch the image field to create a preview
  const watchImage = watch("image");

  useEffect(() => {
    if (watchImage && watchImage[0]) {
      const file = watchImage[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  }, [watchImage]);

  useEffect(() => {
    if (userEmail && users?.data?.length > 0) {
      const foundUser = users.data.find((user) => user?.email === userEmail);
      setCurrentUser(foundUser || null);
    }
  }, [userEmail, users]);
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

  const onSubmit = async (data) => {
    let profileImageUrl = currentUser?.photoUrl || "";

    // Upload image if selected
    if (data.photo?.[0]) {
      const formData = new FormData();
      formData.append("image", data.photo[0]);

      const imgRes = await fetch(img_hosting_url, {
        method: "POST",
        body: formData,
      });

      const imgData = await imgRes.json();
      if (imgData.success) {
        profileImageUrl = imgData.data.display_url;
      }
    }

    const updatedData = {
      caption: data.caption,
      photoUrl: profileImageUrl,
      userId: currentUser?._id,
      // add other fields you want to send
    };
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/posts/create-post",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        }
      );

      if (response.ok) {
        alert("Post created successfully!");
        reset();
        setImagePreview(null);
        onClose();
      } else {
        console.error("Failed to create post");
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg mx-auto p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl"
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold mb-4">Create Post</h2>

        {/* User Info */}
        <div className="flex items-center gap-3 mb-4">
          {currentUser?.photoUrl ? (
            <img
              src={currentUser.photoUrl}
              alt={currentUser.name}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <FaRegCircleUser className="w-10 h-10 text-gray-400" />
          )}
          <span className="font-medium">
            {currentUser?.name || "Loading..."}
          </span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <textarea
            {...register("caption")}
            placeholder="What's on your mind?"
            className="w-full border rounded px-3 py-2 focus:outline-none"
            rows={3}
          />

          {imagePreview && (
            <div className="relative w-full">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full rounded mb-2"
              />
            </div>
          )}

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="file"
              {...register("photo")}
              accept="image/*"
              className="input"
            />
            <span className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Choose Image
            </span>
            {watchImage?.[0]?.name && (
              <span className="text-sm text-gray-600 truncate max-w-[200px]">
                {watchImage[0].name}
              </span>
            )}
          </label>

          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogPost;
