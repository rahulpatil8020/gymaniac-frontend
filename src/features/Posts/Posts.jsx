import React from "react";
import PostWidget from "./PostWidget";
import { useGetPostsQuery } from "./postsApiSlice";

const Posts = () => {
  const {
    data: posts,
    // isLoading,
    // isSuccesss,
    // isError,
    // error,
  } = useGetPostsQuery("postsList", {
    // pollingInterval: 60000,
    // refetchOnFocus: true,
    // refetchOnMountOrArgChange: true,
  });

  return (
    <>
      {posts?.ids?.map((id) => (
        <PostWidget key={id} postId={id} />
      ))}
    </>
  );
};

export default Posts;
