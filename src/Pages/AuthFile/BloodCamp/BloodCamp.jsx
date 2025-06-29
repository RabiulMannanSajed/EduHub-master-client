import { Link } from "react-router-dom";
import useBloodDonors from "../../../hooks/useBloodDonners";

const BloodCamp = () => {
  const [users] = useBloodDonors();
  console.log(users.data);
  return (
    <div className="w-[80%] mx-auto">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 p-4">
        {users?.data?.map((user) => (
          <Link to={`/blood-donor/${user._id}`}>
            {" "}
            <div
              key={user._id}
              className="bg-white p-4 shadow-lg rounded-lg transition-all transform hover:scale-105 hover:shadow-xl flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center">
                <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center mr-3">
                  <span className="font-bold text-sm">
                    {user.name?.charAt(0).toUpperCase() || "D"}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-800 uppercase">
                    {user.name}
                  </h3>
                  <p className="text-xs text-gray-600">{user.blood}</p>
                  <p className="text-xs text-gray-500">{user.varsityName}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BloodCamp;
