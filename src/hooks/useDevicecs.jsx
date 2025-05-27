import { useQuery } from "@tanstack/react-query";

const useDevicecs = () => {
  const {
    isPending,
    data: devices = [],
    refetch,
  } = useQuery({
    queryKey: ["devices"],
    queryFn: async () => {
      const res = await fetch(
        "http://localhost:5000/api/v1/sell/get-all-devices"
      );
      return res.json();
    },
  });
  return [devices, refetch, isPending];
};

export default useDevicecs;
