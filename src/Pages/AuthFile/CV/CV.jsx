import React, { useEffect, useState } from "react";
import { useUser } from "../CustomProvider/userContext";
import useBloodDonors from "../../../hooks/useBloodDonners";
import useFreelancer from "../../../hooks/useFreelancer";

const CV = () => {
  const { userEmail } = useUser();
  const [users] = useBloodDonors();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (userEmail && users?.data?.length > 0) {
      const foundUser = users.data.find((user) => user?.email === userEmail);
      setCurrentUser(foundUser || null);
    }
  }, [userEmail, users]);
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

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      {/* Profile Picture and Basic Info */}
      <div className="flex items-center space-x-6 border-b pb-4">
        <img
          src={currentUser?.photoUrl}
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover border"
        />
        <div>
          <h1 className="text-2xl font-bold">{currentUser?.name}</h1>
          <p className="text-gray-600">{currentUser?.email}</p>
          <p className="text-sm text-gray-500">
            Blood Group: {currentUser?.blood}
          </p>
          <p className="text-sm text-gray-500">
            {currentUser?.departmentName} Department, {currentUser?.varsityName}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">About Me</h2>
        <p className="text-gray-700">{matchedFreelance?.bio}</p>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Skills</h2>
        <ul className="space-y-2">
          {currentUser?.skills?.map((skill) => (
            <li key={skill._id} className="flex justify-between text-gray-700">
              <span>{skill.name}</span>
              <span>{skill.label}%</span>
            </li>
          ))}
        </ul>
      </div>
      {matchedFreelance?.workType && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Work Experience</h2>
          <p className="text-gray-800 font-medium">
            {matchedFreelance.workType}
          </p>
          <p className="text-gray-600">
            Skills: {matchedFreelance.workDetails}
          </p>
        </div>
      )}
    </div>
  );
};

export default CV;
