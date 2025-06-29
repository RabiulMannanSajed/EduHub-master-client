import { useQuery } from "@tanstack/react-query";
import React from "react";

const usePaymet = () => {
  const {
    isPending,
    data: orders = [],
    refetch,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await fetch(
        "http://localhost:5000/api/v1/orders/get-all-payment"
      );
      return res.json();
    },
  });
  return [orders, refetch, isPending];
};

export default usePaymet;
