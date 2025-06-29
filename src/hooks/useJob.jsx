import { useQuery } from "@tanstack/react-query";
import React from "react";

const useJob = () => {
  const {
    isPending,
    data: jobs = [],
    refetch,
  } = useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/api/v1/jobs/get-all-job");
      return res.json();
    },
  });
  return [jobs, refetch, isPending];
};

export default useJob;
