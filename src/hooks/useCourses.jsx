import { useQuery } from "@tanstack/react-query";
import React from "react";

const useCourses = () => {
  const {
    isPending,
    data: courses = [],
    refetch,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await fetch(
        "http://localhost:5000/api/v1/courses/get-all-courses"
      );
      return res.json();
    },
  });
  return [courses, refetch, isPending];
};

export default useCourses;
