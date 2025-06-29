import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useJob from "../../../../hooks/useJob";
import { useUser } from "../../CustomProvider/userContext";
import useBloodDonors from "../../../../hooks/useBloodDonners";
import ApplyForm from "../ApplyFormJob/ApplyFormJob";
import useApplication from "../../../../hooks/useApplication";

const JobCard = () => {
  const { id } = useParams();
  const [jobs] = useJob();
  const [showApplyModal, setShowApplyModal] = useState(false);
  const { userEmail } = useUser();
  const [users] = useBloodDonors(); // get the data array from the object
  const [currentUser, setCurrentUser] = useState(null);
  const [JobApplications] = useApplication();

  useEffect(() => {
    if (userEmail && users?.data?.length > 0) {
      const foundUser = users.data.find((user) => user?.email === userEmail);
      setCurrentUser(foundUser || null);
    }
  }, [userEmail, users]);
  // Find the job by id
  const job = jobs?.data?.find((j) => j._id === id);

  if (!job) {
    return <p className="text-center text-gray-500">Job not found.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* Top section */}
      <div className="flex justify-between items-center gap-4 border-b pb-4 mb-4">
        <img
          src={job.companyLogo}
          alt={job.companyName}
          className=" h-20 object-cover "
        />
        <div>
          <h1 className="text-2xl font-bold">{job.companyName}</h1>
          <p className="text-gray-600">{job.jobTitle}</p>
          <p className="text-sm text-gray-500">{job.workFrom}</p>
        </div>
      </div>

      {/* About the work */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold">About the work</h2>
        <p className="text-gray-700 mt-1">{job.aboutTheWork}</p>
      </div>

      {/* Skills */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Skills Required</h2>
        <ul className="flex flex-wrap gap-2 mt-2">
          {job.skill?.map((skill, idx) => (
            <li key={idx} className="bg-gray-200 text-sm px-2 py-1 rounded">
              {skill}
            </li>
          ))}
        </ul>
      </div>

      {/* Other details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <h3 className="font-medium">Duration</h3>
          <p>{job.duration}</p>
        </div>
        <div>
          <h3 className="font-medium">Stipend</h3>
          <p>{job.stipend}</p>
        </div>
        <div>
          <h3 className="font-medium">Start Date</h3>
          <p>{job.startDate}</p>
        </div>
        <div>
          <h3 className="font-medium">Experience</h3>
          <p>{job.experience}</p>
        </div>
        <div>
          <h3 className="font-medium">Location(s)</h3>
          <p>{job.location?.join(", ")}</p>
        </div>
      </div>

      {/* Who can apply */}
      <div>
        <h2 className="text-lg font-semibold">Who can apply</h2>
        <ul className="list-disc list-inside mt-2 space-y-1">
          {job.whoApply?.map((condition, idx) => (
            <li key={idx}>{condition}</li>
          ))}
        </ul>
      </div>
      <div className="max-w-3xl mx-auto p-4">
        {job ? (
          <>
            <h1 className="text-2xl font-bold mb-2">{job.jobTitle}</h1>
            <p className="text-gray-600 mb-4">{job.companyName}</p>
            <button
              onClick={() => setShowApplyModal(true)}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Apply Now
            </button>

            {/* This is where the modal goes */}
            {showApplyModal && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white w-full max-w-md rounded-lg p-6 relative">
                  <button
                    onClick={() => setShowApplyModal(false)}
                    className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl"
                  >
                    &times;
                  </button>
                  <ApplyForm
                    currentUser={currentUser}
                    job={job}
                    onClose={() => setShowApplyModal(false)}
                  />
                </div>
              </div>
            )}
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default JobCard;
