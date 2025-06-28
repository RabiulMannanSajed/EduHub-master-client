import { useQuery } from "@tanstack/react-query";
import React from "react";

const useMessage = () => {
  const {
    isPending,
    data: messages = [],
    refetch,
  } = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const res = await fetch(
        "http://localhost:5000/api/v1/messages/get-all-messages"
      );
      return res.json();
    },
  });
  return [messages, refetch, isPending];
};

export default useMessage;
