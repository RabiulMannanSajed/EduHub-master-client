import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useUser } from "../../CustomProvider/userContext";
import useBloodDonors from "../../../../hooks/useBloodDonners";
import useFreelancer from "../../../../hooks/useFreelancer";

const FreelancingInstructor = () => {
  const { userEmail } = useUser();
  const [users] = useBloodDonors();
  const [currentUser, setCurrentUser] = useState(null);
  const [freelances] = useFreelancer();

  const [matchedFreelance, setMatchedFreelance] = useState(null);

  useEffect(() => {
    if (freelances?.data && currentUser?._id) {
      const match = freelances.data.find(
        (freelance) => String(freelance.userID) === String(currentUser._id)
      );
      setMatchedFreelance(match);
    }
  }, [freelances, currentUser]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = {
        ...data,
        userID: currentUser?._id, // add userID here
      };
      const response = await axios.post(
        "http://localhost:5000/api/v1/freelancer/create-Freelancer",
        formData
      );
      console.log("Success:", response.data);
      reset();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Add Freelance Work
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("workType", { required: true })}
          placeholder="Work Type (e.g., Web Design)"
          className="w-full p-2 border rounded"
        />
        {errors.workType && (
          <p className="text-red-500">Work type is required</p>
        )}

        <input
          {...register("workTitle", { required: true })}
          placeholder="Work Title"
          className="w-full p-2 border rounded"
        />
        {errors.workTitle && (
          <p className="text-red-500">Work title is required</p>
        )}

        <input
          {...register("bio", { required: true })}
          placeholder="Short Bio"
          className="w-full p-2 border rounded"
        />
        {errors.bio && <p className="text-red-500">Bio is required</p>}

        <textarea
          {...register("workDetails", { required: true })}
          placeholder="Work Details"
          className="w-full p-2 border rounded"
          rows={4}
        />
        {errors.workDetails && (
          <p className="text-red-500">Work details are required</p>
        )}

        <input
          {...register("workPrice", { required: true })}
          placeholder="Work Price (e.g., $200)"
          className="w-full p-2 border rounded"
        />
        {errors.workPrice && <p className="text-red-500">Price is required</p>}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FreelancingInstructor;
