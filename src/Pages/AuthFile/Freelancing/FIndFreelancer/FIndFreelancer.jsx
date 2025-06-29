import { Link, NavLink, useNavigate } from "react-router-dom";
import useBloodDonors from "../../../../hooks/useBloodDonners";
import useFreelancer from "../../../../hooks/useFreelancer";
import { div } from "framer-motion/client";
import { useUser } from "../../CustomProvider/userContext";
import { useEffect, useState } from "react";

const FIndFreelancer = () => {
  const [freelances] = useFreelancer();
  const { userEmail } = useUser();
  const [users] = useBloodDonors(); // get the data array from the object
  const [currentUser, setCurrentUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (userEmail && users?.data?.length > 0) {
      const foundUser = users.data.find((user) => user?.email === userEmail);
      setCurrentUser(foundUser || null);
    }
  }, [userEmail, users]);

  return (
    <div className="w-[80%] mx-auto">
      <div className="h-screen">
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2  pt-4">
          {freelances?.data?.map((freelance) => {
            // Find the matching user
            const matchedUser = users?.data?.find(
              (user) => user._id === freelance.userID
            );

            return (
              <div
                key={freelance._id}
                className=" p-4  shadow-md rounded-xl bg-white w-[80%] mx-auto"
              >
                <h2 className="text-lg font-bold mb-2">{freelance.workType}</h2>
                <p className="text-gray-700 mb-1">
                  <strong>Name:</strong>{" "}
                  {matchedUser ? matchedUser.name : "Unknown"}
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>Bio:</strong> {freelance.bio}
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>Details:</strong> {freelance.workDetails}
                </p>
                <p className="text-gray-900 font-semibold">
                  <strong>Price:</strong> ${freelance.workPrice}
                </p>
                <Link to={`/blood-donor/${freelance.userID}`}>
                  <p className="mt-4 w-full inline-block bg-red-600 text-white py-2 rounded-md hover:bg-red-700 text-sm font-semibold text-center">
                    Contract{" "}
                  </p>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FIndFreelancer;
