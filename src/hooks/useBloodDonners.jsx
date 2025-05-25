import { useQuery } from "@tanstack/react-query";

const useBloodDonors = () => {
  const {
    isPending,
    data: users = [],
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(
        "http://localhost:5000/api/v1/users/get-all-bloodDonors"
      );
      return res.json();
    },
  });
  return [users, refetch, isPending];
};
export default useBloodDonors;
