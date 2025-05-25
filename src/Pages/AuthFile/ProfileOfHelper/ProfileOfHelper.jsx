import { useParams } from "react-router";
import useBloodDonors from "../../../hooks/useBloodDonners";
import { useEffect, useState } from "react";

const ProfileOfHelper = () => {
  const { id } = useParams();
  const [users] = useBloodDonors();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const userProfile = users?.data?.find((userId) => userId._id === id);
    setUserInfo(userProfile || null);
  }, [id, users?.data]);
  if (!userInfo) {
    return (
      <div className="text-center mt-10">Loading or User not found...</div>
    );
  }

  return (
    <div className="max-w-[80%] mx-auto">
      <div className="mt-10 p-6 bg-white rounded-lg shadow-lg">
        <div className="flex border-b-2 border-gray-300 pb-6">
          {/* Skills Section */}
          <div className="w-1/3 pr-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Skills</h3>

            {/* You can hardcode these or make them dynamic if you store skill levels */}
            {[
              { name: "HTML", level: 90 },
              { name: "CSS", level: 85 },
              { name: "JavaScript", level: 80 },
              { name: "PHP", level: 75 },
              { name: "WordPress", level: 85 },
            ].map((skill, idx) => (
              <div className="mb-3" key={idx}>
                <p className="text-sm text-gray-600">{skill.name}</p>
                <div className="w-full bg-gray-200 h-2 mb-2">
                  <div
                    className="bg-yellow-400 h-2"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600">{skill.level}%</p>
              </div>
            ))}

            <button className="mt-6 bg-black text-white px-4 py-2 rounded hover:bg-gray-700 w-full">
              Download CV
            </button>
          </div>

          {/* Profile Section */}
          <div className="w-2/3">
            <div className="flex items-center space-x-6">
              <img
                src="/img/profile.png"
                alt="User"
                className="w-24 h-24 rounded-full object-cover"
              />
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  {userInfo?.name || "N/A"}
                </h2>
                <p className="text-sm text-gray-500">
                  {userInfo?.email || "No email provided"}
                </p>
                <p className="text-sm text-gray-500">
                  Department: {userInfo?.departmentName || "N/A"}
                </p>
                <p className="text-sm text-gray-500">
                  Varsity: {userInfo?.varsityName || "N/A"}
                </p>
                <div className="flex space-x-4 mt-2">
                  <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm">
                    Message
                  </button>
                  <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 text-sm">
                    Follow
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 flex space-x-6 text-sm text-gray-600">
              <span className="flex items-center space-x-1">
                <div className="w-2.5 h-2.5 rounded-full bg-red-600"></div>
                <span>{userInfo?.blood || "N/A"}</span>
              </span>
              <span className="flex items-center space-x-1">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                <span>Available to donate</span>
              </span>
            </div>

            {/* Top Posts (optional) */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Top Posts
              </h3>
              <div className="space-y-4">
                <div className="bg-gray-100 p-4 rounded-md hover:bg-gray-200 hover:shadow-lg transition-all">
                  <p className="text-gray-700">
                    Exploring Tailwind CSS for responsive UI design!
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Posted on March 10, 2025
                  </p>
                </div>
                <div className="bg-gray-100 p-4 rounded-md hover:bg-gray-200 hover:shadow-lg transition-all">
                  <p className="text-gray-700">
                    Selling my new book on full-stack dev! Check it out.
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Posted on Feb 25, 2025
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileOfHelper;
