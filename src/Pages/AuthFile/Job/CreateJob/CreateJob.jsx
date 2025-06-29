import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useUser } from "../../CustomProvider/userContext";
import useBloodDonors from "../../../../hooks/useBloodDonners";

const img_hosting_token = "33706d1cbb5d148ebd01d844598979ba";
const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

const CreateJob = () => {
  const { userEmail } = useUser();
  const [users] = useBloodDonors();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (userEmail && users?.data?.length > 0) {
      const foundUser = users.data.find((user) => user?.email === userEmail);
      setCurrentUser(foundUser || null);
    }
  }, [userEmail, users]);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      companyName: "",
      jobName: "",
      companyLogo: "",
      location: [""],
      jobTitle: "",
      duration: "",
      stipend: "",
      startDate: "",
      experience: "",
      workFrom: "",
      aboutTheWork: "",
      skill: [""],
      whoApply: [""],
    },
  });

  const {
    fields: locationFields,
    append: appendLocation,
    remove: removeLocation,
  } = useFieldArray({
    control,
    name: "location",
  });

  const {
    fields: skillFields,
    append: appendSkill,
    remove: removeSkill,
  } = useFieldArray({
    control,
    name: "skill",
  });

  const {
    fields: whoApplyFields,
    append: appendWhoApply,
    remove: removeWhoApply,
  } = useFieldArray({
    control,
    name: "whoApply",
  });

  const onSubmit = async (data) => {
    let companyLogoUrl = "";

    // Upload logo if provided
    if (data.companyLogo?.[0]) {
      const formData = new FormData();
      formData.append("image", data.companyLogo[0]);

      const imgRes = await fetch(img_hosting_url, {
        method: "POST",
        body: formData,
      });

      const imgData = await imgRes.json();
      if (imgData.success) {
        companyLogoUrl = imgData.data.display_url;
      }
    }

    const jobData = {
      ...data,
      companyLogo: companyLogoUrl || "",
      userID: currentUser?._id, // set user ID here
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/jobs/create-job",
        jobData
      );

      if (response.data?.success) {
        alert("Job created successfully!");
        reset();
      } else {
        alert("Failed to create job.");
      }
    } catch (error) {
      console.error("Error creating job:", error);
      alert("Error creating job. See console for details.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl mx-auto p-4 space-y-4"
    >
      <h2 className="text-xl font-semibold mb-2">Create Job</h2>

      <input
        {...register("companyName", { required: "Company name is required" })}
        placeholder="Company Name"
        className="w-full border p-2 rounded"
      />
      {errors.companyName && (
        <p className="text-red-500">{errors.companyName.message}</p>
      )}

      <input
        {...register("jobName", { required: "Job name is required" })}
        placeholder="Job Name"
        className="w-full border p-2 rounded"
      />
      {errors.jobName && (
        <p className="text-red-500">{errors.jobName.message}</p>
      )}

      <input
        type="file"
        {...register("companyLogo")}
        accept="image/*"
        className="w-full border p-2 rounded"
      />

      <input
        {...register("jobTitle", { required: "Job title is required" })}
        placeholder="Job Title"
        className="w-full border p-2 rounded"
      />
      {errors.jobTitle && (
        <p className="text-red-500">{errors.jobTitle.message}</p>
      )}

      <input
        {...register("duration")}
        placeholder="Duration"
        className="w-full border p-2 rounded"
      />
      <input
        {...register("stipend")}
        placeholder="Stipend"
        className="w-full border p-2 rounded"
      />
      <input
        {...register("startDate")}
        placeholder="Start Date"
        className="w-full border p-2 rounded"
      />
      <input
        {...register("experience")}
        placeholder="Experience"
        className="w-full border p-2 rounded"
      />
      <input
        {...register("workFrom")}
        placeholder="Work From"
        className="w-full border p-2 rounded"
      />
      <textarea
        {...register("aboutTheWork")}
        placeholder="About the Work"
        className="w-full border p-2 rounded"
        rows={3}
      />

      {/* Locations */}
      <div>
        <p className="font-medium">Locations</p>
        {locationFields.map((field, index) => (
          <div key={field.id} className="flex gap-2 mb-2">
            <input
              {...register(`location.${index}`)}
              placeholder="Location"
              className="flex-1 border p-2 rounded"
            />
            <button
              type="button"
              onClick={() => removeLocation(index)}
              className="text-red-500"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => appendLocation("")}
          className="text-blue-500"
        >
          + Add Location
        </button>
      </div>

      {/* Skills */}
      <div>
        <p className="font-medium">Skills</p>
        {skillFields.map((field, index) => (
          <div key={field.id} className="flex gap-2 mb-2">
            <input
              {...register(`skill.${index}`)}
              placeholder="Skill"
              className="flex-1 border p-2 rounded"
            />
            <button
              type="button"
              onClick={() => removeSkill(index)}
              className="text-red-500"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => appendSkill("")}
          className="text-blue-500"
        >
          + Add Skill
        </button>
      </div>

      {/* Who Can Apply */}
      <div>
        <p className="font-medium">Who Can Apply</p>
        {whoApplyFields.map((field, index) => (
          <div key={field.id} className="flex gap-2 mb-2">
            <input
              {...register(`whoApply.${index}`)}
              placeholder="Who Can Apply"
              className="flex-1 border p-2 rounded"
            />
            <button
              type="button"
              onClick={() => removeWhoApply(index)}
              className="text-red-500"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => appendWhoApply("")}
          className="text-blue-500"
        >
          + Add Condition
        </button>
      </div>

      <button
        type="submit"
        className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
      >
        Create Job
      </button>
    </form>
  );
};

export default CreateJob;
