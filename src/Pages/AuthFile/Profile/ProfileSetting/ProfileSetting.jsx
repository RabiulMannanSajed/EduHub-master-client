import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";
import { useUser } from "../../CustomProvider/userContext";
import useBloodDonors from "../../../../hooks/useBloodDonners";

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

  const onSubmit = async (data) => {
    try {
      if (!currentUser?._id) {
        console.error("User ID not found");
        return;
      }

      const response = await axios.patch(
        `http://localhost:5000/api/v1/users/${currentUser?._id}`,
        data
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label>University Name</label>
        <input {...register("varsityName")} className="input" />
      </div>

      <div>
        <label>Department Name</label>
        <input {...register("departmentName")} className="input" />
      </div>

      <div>
        <label>Phone</label>
        <input {...register("Phone")} className="input" />
      </div>

      <div>
        <label>Address</label>
        <input {...register("Address")} className="input" />
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
            <button type="button" onClick={() => remove(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={() => append({ name: "", label: "" })}>
          Add Skill
        </button>
      </div>

      <button type="submit" className="btn btn-primary">
        Update Info
      </button>
    </form>
  );
};

export default ProfileSetting;
