import { useParams } from "react-router";
import useBloodDonors from "../../../hooks/useBloodDonners";
import { useEffect, useState } from "react";
import useFreelancer from "../../../hooks/useFreelancer";
import { NavLink } from "react-router-dom";

const ProfileOfHelper = () => {
  const { id } = useParams();
  const [users] = useBloodDonors();
  const [freelances] = useFreelancer();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const userProfile = users?.data?.find((userId) => userId._id === id);
    setCurrentUser(userProfile || null);
  }, [id, users?.data]);

  const freelancer = Array.isArray(freelances?.data)
    ? freelances.data.find((item) => item.userID === currentUser?._id)
    : null;
  if (!currentUser) {
    return (
      <div className="text-center mt-10">Loading or User not found...</div>
    );
  }

  return (
    <div className="h-screen">
      <div className="max-w-[80%] mx-auto">
        <div className=" mt-10 p-6 bg-white rounded-lg shadow-lg">
          <div className="flex border-b-2 border-gray-300 pb-6">
            <div className="w-1/3 pr-8">
              {currentUser?.skills?.length > 0 ? (
                <>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Skills
                  </h3>
                  {currentUser.skills.map((skill, index) => (
                    <div className="mb-3" key={index}>
                      <p className="text-sm text-gray-600">{skill.name}</p>
                      <div className="w-full bg-gray-200 h-2 mb-2">
                        <div
                          className="bg-yellow-400 h-2"
                          style={{ width: `${skill.label}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600">{skill.label}%</p>
                    </div>
                  ))}
                </>
              ) : (
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  No skills added
                </h3>
              )}
              <NavLink to="/cv">
                <p className="mt-[70%] bg-black text-white px-4 py-2 rounded hover:bg-gray-700 w-full text-center">
                  CV
                </p>
              </NavLink>
            </div>

            <div className="w-2/3">
              <div className="flex items-center space-x-6">
                {currentUser?.photoUrl ? (
                  <img
                    src={currentUser?.photoUrl}
                    alt="User Image"
                    className="w-24 h-24 rounded-full object-cover"
                  />
                ) : (
                  <>
                    {" "}
                    <img
                      src="/img/profile.png"
                      alt="User Image"
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  </>
                )}
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {currentUser?.name ? (
                      <h2 className="text-2xl font-semibold text-gray-800">
                        {currentUser.name}
                      </h2>
                    ) : (
                      <></>
                    )}
                  </h2>
                  {currentUser?.email ? (
                    <p className="text-sm text-gray-500">{currentUser.email}</p>
                  ) : (
                    <></>
                  )}{" "}
                  {freelancer ? (
                    <>
                      {freelancer.workType && (
                        <p className="text-sm text-gray-500">
                          {freelancer.workType} at NextGen Learner
                        </p>
                      )}
                      {freelancer.workTitle && (
                        <p className="text-sm text-gray-500 uppercase">
                          {freelancer.workTitle}
                        </p>
                      )}
                      {freelancer.bio && (
                        <p className="text-sm text-gray-500 italic ">
                          {freelancer.bio}
                        </p>
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                  {currentUser?.varsityName ? (
                    <p className="text-sm text-gray-500">
                      {currentUser.varsityName}
                    </p>
                  ) : (
                    <></>
                  )}{" "}
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
                  {currentUser?.blood ? (
                    <span className="flex items-center space-x-1">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-600"></div>
                      <span>{currentUser.blood}</span>
                    </span>
                  ) : (
                    <></>
                  )}
                </span>
                <span className="flex items-center space-x-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                  <span>Available to donate</span>
                </span>
              </div>

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
    </div>
  );
};

export default ProfileOfHelper;
