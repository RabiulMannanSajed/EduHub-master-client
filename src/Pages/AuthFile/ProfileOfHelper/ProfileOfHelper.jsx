import { useParams } from "react-router";
import useBloodDonors from "../../../hooks/useBloodDonners";
import { useEffect } from "react";

const ProfileOfHelper = () => {
  const { id } = useParams();
  const [users] = useBloodDonors();
  console.log(users.data);
  // find the user by the id
  useEffect(() => {
    const userProfile = users?.data?.find((userId) => userId._id === id);
    console.log("match profile ", userProfile);
  }, [id, users?.data]);
  return (
    <div>
      <h1>this si helper profile </h1>
    </div>
  );
};

export default ProfileOfHelper;
