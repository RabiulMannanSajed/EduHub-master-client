import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";
import { useUser } from "../../CustomProvider/userContext";
import useBloodDonors from "../../../../hooks/useBloodDonners";
const img_hosting_token = "33706d1cbb5d148ebd01d844598979ba";
// Assuming these custom hooks return user info and blood donor list

const ProfileSetting = () => {
  const { userEmail } = useUser();
  const [users] = useBloodDonors();
  const [currentUser, setCurrentUser] = useState(null);

  // react-hook-form setup
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      varsityName: "",
      departmentName: "",
      Phone: "",
      Address: "",
      skills: [{ name: "", label: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });

  // Set current user based on email
  useEffect(() => {
    if (userEmail && users?.data?.length > 0) {
      const foundUser = users.data.find((user) => user?.email === userEmail);
      setCurrentUser(foundUser || null);
    }
  }, [userEmail, users]);

  // Populate form with user data
  useEffect(() => {
    if (currentUser) {
      reset({
        varsityName: currentUser.varsityName || "",
        departmentName: currentUser.departmentName || "",
        Phone: currentUser.Phone || "",
        Address: currentUser.Address || "",
        skills:
          currentUser.skills?.length > 0
            ? currentUser.skills
            : [{ name: "", label: "" }],
      });
    }
  }, [currentUser, reset]);

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

    // Build update payload
    const updatedData = {
      ...data,
      photoUrl: profileImageUrl,
    };

    try {
      const response = await axios.patch(
        `http://localhost:5000/api/v1/users/${currentUser?._id}`,
        updatedData
      );

      if (response?.data?.success) {
        alert("User updated successfully!");
      } else {
        alert("Something went wrong while updating user.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Something went wrong while updating user.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 w-[80%] mx-auto h-screen justify-center items-center"
    >
      <p className="text-2xl font-semibold text-center mb-10 mt-7">
        Update Profile{" "}
      </p>
      <div className="flex justify-between">
        <div className="flex-1">
          <label className="mb-5 mt-5">University Name</label>
          <br />
          <input {...register("varsityName")} className="input" />
        </div>

        <div className="flex-1">
          <label className="mb-5 mt-5">Department Name</label>
          <br />
          <input {...register("departmentName")} className="input" />
        </div>
      </div>

      <div className="flex justify-between">
        <div className="flex-1">
          <label>Phone</label>
          <br />
          <input {...register("Phone")} className="input" />
        </div>

        <div className="flex-1">
          <label>Address</label>
          <br />
          <input {...register("Address")} className="input" />
        </div>
      </div>
      <div>
        <label>Profile Photo</label>
        <br />
        <input
          type="file"
          {...register("photo")}
          accept="image/*"
          className="input"
        />
      </div>
      <div>
        <label>Skills</label>
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2 items-center mb-2">
            <input
              {...register(`skills.${index}.name`)}
              placeholder="Skill Name"
              className="input"
            />
            <input
              {...register(`skills.${index}.label`)}
              placeholder="Skill Label"
              className="input"
            />
            <button
              className="bg-red-500 pt-2 pb-2 pl-3 pr-3 rounded font-bold text-white"
              type="button"
              onClick={() => remove(index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          className="bg-blue-500 pt-2 pb-2 pl-3 pr-3 rounded font-bold"
          onClick={() => append({ name: "", label: "" })}
        >
          Add Skill
        </button>
      </div>

      <button type="submit" className="btn bg-green-500 font-bold">
        Update Info
      </button>
    </form>
  );
};

export default ProfileSetting;
