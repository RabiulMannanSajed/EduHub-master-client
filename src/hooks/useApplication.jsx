import { useQuery } from "@tanstack/react-query";

const useApplication = () => {
  const {
    isPending,
    data: JobApplications = [],
    refetch,
  } = useQuery({
    queryKey: ["JobApplications"],
    queryFn: async () => {
      const res = await fetch(
        "http://localhost:5000/api/v1/applications/get-all-jobApplication"
      );
      return res.json();
    },
  });
  return [JobApplications, refetch, isPending];
};

export default useApplication;
