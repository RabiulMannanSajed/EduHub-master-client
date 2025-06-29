import React from "react";
import useBloodDonors from "../../../../hooks/useBloodDonners";
import useJob from "../../../../hooks/useJob";
import { FaRegCircleUser } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const Jobs = () => {
  const [jobs] = useJob();
  const [users] = useBloodDonors();

  return (
    <div className="h-screen">
      <div className="w-[80%] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
          {jobs?.data?.map((job, index) => {
            // Find the user who created this job
            const user = users?.data?.find((u) => u._id === job.userID);

            return (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border rounded-lg p-4 shadow hover:shadow-md transition bg-white"
              >
                {/* Company Logo */}
                <img
                  src={job.companyLogo}
                  alt={job.companyName}
                  className="h-24 object-cover mb-2"
                />

                {/* Company and Job Info */}
                <div className="flex justify-between">
                  <div>
                    <h2 className="text-lg font-semibold">{job.companyName}</h2>
                  </div>
                  <div>
                    <p className="text-gray-600">{job.jobName}</p>
                    <p className="text-gray-500">Work From: {job.workFrom}</p>
                  </div>
                </div>

                {/* User Info */}
                <div className="flex items-center mt-3 gap-2">
                  {user?.photoUrl ? (
                    <img
                      src={user.photoUrl}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <FaRegCircleUser className="w-8 h-8 text-gray-400" />
                  )}
                  <span className="text-sm">
                    {user?.name || "Unknown User"}
                  </span>
                </div>

                {/* Button */}
                <NavLink
                  to={`/job-details/${job._id}`}
                  className="inline-block mt-3 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                >
                  See Job Details
                </NavLink>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
