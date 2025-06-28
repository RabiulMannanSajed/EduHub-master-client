import { useQuery } from "@tanstack/react-query";

const useBlogs = () => {
  const {
    isPending,
    data: blogs = [],
    refetch,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await fetch(
        "http://localhost:5000/api/v1/posts/get-all-post"
      );
      return res.json();
    },
  });
  return [blogs, refetch, isPending];
};

export default useBlogs;
