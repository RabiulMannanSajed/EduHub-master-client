import { useQuery } from "@tanstack/react-query";
import React from "react";

const useFreelancer = () => {
  const {
    isPending,
    data: freelances = [],
    refetch,
  } = useQuery({
    queryKey: ["freelances"],
    queryFn: async () => {
      const res = await fetch(
        "http://localhost:5000/api/v1/freelancer/get-all-Freelancer"
      );
      return res.json();
    },
  });
  return [freelances, refetch, isPending];
};

export default useFreelancer;
