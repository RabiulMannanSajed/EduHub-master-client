import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const ApplyForm = ({ currentUser, job, onClose }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: currentUser?.name || "",
      email: currentUser?.email || "",
      experience: "",
      previousWork: "",
    },
  });

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      jobID: job._id,
      applicantID: currentUser?._id,
    };

    try {
      await axios.post(
        "http://localhost:5000/api/v1/applications/create-jobApplication",
        payload
      );
      alert("Application submitted successfully!");
      reset();
      onClose();
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Failed to submit application.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-xl font-semibold">Apply for {job.jobTitle}</h2>

      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          {...register("name")}
          readOnly
          className="w-full border rounded px-3 py-2 bg-gray-100"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          {...register("email")}
          readOnly
          className="w-full border rounded px-3 py-2 bg-gray-100"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Experience (years)</label>
        <input
          {...register("experience", { required: true })}
          placeholder="e.g., 2"
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">
          Previous Work Experience
        </label>
        <textarea
          {...register("previousWork", { required: true })}
          placeholder="Describe any relevant experience..."
          className="w-full border rounded px-3 py-2"
          rows={3}
        />
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border rounded hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Submit Application
        </button>
      </div>
    </form>
  );
};

export default ApplyForm;
