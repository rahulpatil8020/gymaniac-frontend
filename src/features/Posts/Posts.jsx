import React from "react";
import PostWidget from "./PostWidget";
import { useGetPostsQuery } from "./postsApiSlice";

const Posts = () => {
  const {
    data: posts,
    isLoading,
    isSuccesss,
    isError,
    error,
  } = useGetPostsQuery("postsList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  console.log(posts);
  return (
    <>
      {[1, 2, 3].map((id) => (
        <PostWidget key={id} />
      ))}
    </>
  );
};

export default Posts;
