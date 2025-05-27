import { useQuery } from "@tanstack/react-query";
import React from "react";

const useBooks = () => {
  const {
    isPending,
    data: sells = [],
    refetch,
  } = useQuery({
    queryKey: ["sells"],
    queryFn: async () => {
      const res = await fetch(
        "http://localhost:5000/api/v1/sell/get-all-books"
      );
      return res.json();
    },
  });
  return [sells, refetch, isPending];
};

export default useBooks;
