import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";
import useBloodDonors from "../../../../hooks/useBloodDonners";
import { useUser } from "../../CustomProvider/userContext";
const img_hosting_token = "33706d1cbb5d148ebd01d844598979ba";

const CreateCourse = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { userEmail } = useUser();
  const [users] = useBloodDonors(); // get the data array from the object
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (userEmail && users?.data?.length > 0) {
      const foundUser = users.data.find((user) => user?.email === userEmail);
      console.log("foundUser:", foundUser);
      setCurrentUser(foundUser || null);
    }
  }, [userEmail, users]);
  console.log("currentUser form sell", currentUser);
  const { register, control, handleSubmit, reset } = useForm({
    defaultValues: {
      title: "",
      price: "",
      hour: "",
      courseImage: "",
      meet: "",
      videos: [{ video: "", min: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "videos",
  });
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

  //   const onSubmit = async (data) => {
  //     // Upload image if selected
  //     if (data.courseImage?.[0]) {
  //       const formData = new FormData();
  //       formData.append("image", data.courseImage[0]);

  //       const imgRes = await fetch(img_hosting_url, {
  //         method: "POST",
  //         body: formData,
  //       });

  //       const imgData = await imgRes.json();
  //       const imageURL = imgData.success ? imgData.data.display_url : null;
  //       setImgUrl(imageURL);
  //       if (!imageURL) {
  //         alert("Image upload failed");
  //         return;
  //       }
  //     }
  //     const payload = {
  //       ...data,
  //       courseImage: imgUrl,
  //       userID: currentUser?._id, // ✅ Include user ID here
  //       photo: undefined,
  //     };
  //     try {
  //       // Replace with your actual API URL
  //       const res = await axios.post(
  //         "http://localhost:5000/api/v1/courses/create-sell-courses",
  //         payload
  //       );

  //       if (res.ok) {
  //         alert("Sell post uploaded successfully!");
  //         setIsOpen(false);
  //         reset();
  //       } else {
  //         alert("Failed to post: " + res.message || "Unknown error");
  //       }
  //     } catch (error) {
  //       console.error("Failed to create course", error);
  //       alert("Something went wrong!");
  //     }
  //   };
  const onSubmit = async (data) => {
    let imageURL = "";

    if (data.photo?.[0]) {
      const formData = new FormData();
      formData.append("image", data.photo[0]);

      const imgRes = await fetch(img_hosting_url, {
        method: "POST",
        body: formData,
      });

      const imgData = await imgRes.json();
      imageURL = imgData.success ? imgData.data.display_url : "";

      if (!imageURL) {
        alert("Image upload failed");
        return;
      }
    }

    const payload = {
      ...data,
      courseImage: imageURL,
      userID: currentUser?._id, // ✅ Include user ID here
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/courses/create-sell-courses",
        payload
      );

      if (res.data.success) {
        alert("Course created successfully!");
        setIsOpen(false);
        reset();
      } else {
        alert("Failed to post: " + res.data.message || "Unknown error");
      }
    } catch (error) {
      console.error("Failed to create course", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div>
      {/* Plus button */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded-full text-xl"
      >
        Create course For sell
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-xl overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-bold mb-4">Create New Course</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input
                {...register("title")}
                placeholder="Course Title"
                className="w-full p-2 border rounded"
              />
              <input
                {...register("price")}
                placeholder="Price"
                className="w-full p-2 border rounded"
              />
              <input
                {...register("hour")}
                placeholder="Duration (in hours)"
                className="w-full p-2 border rounded"
              />
              <input
                type="file"
                accept="image/*"
                {...register("courseImage")}
                className="w-full p-2 border rounded"
              />
              <input
                {...register("meet")}
                placeholder="Meeting Link"
                className="w-full p-2 border rounded"
              />

              <div>
                <h3 className="font-semibold mb-2">Course Videos</h3>
                {fields.map((item, index) => (
                  <div
                    key={item.id}
                    className="mb-3 flex items-center space-x-2"
                  >
                    <input
                      {...register(`videos.${index}.video`)}
                      placeholder="Video URL"
                      className="flex-1 p-2 border rounded"
                    />
                    <input
                      {...register(`videos.${index}.min`)}
                      placeholder="Minutes"
                      className="w-24 p-2 border rounded"
                    />
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => append({ video: "", min: "" })}
                  className="text-blue-600"
                >
                  + Add Video
                </button>
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateCourse;
