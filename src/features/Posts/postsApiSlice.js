import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const postsAdapter = createEntityAdapter();

const initialState = postsAdapter.getInitialState();

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => ({
        url: "/api/v1/post",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        console.log("GEt post transform response");
        const loadedPosts = responseData.map((post) => {
          post.id = post._id;
          return post;
        });
        return postsAdapter.setAll(initialState, loadedPosts);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Post", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Post", id })),
          ];
        } else return [{ type: "Post", id: "LIST" }];
      },
    }),

    addNewPost: builder.mutation({
      query: (post) => {
        const formData = new FormData();

        formData.append("creator", post.creator);
        formData.append("caption", post.caption);
        formData.append("image", post.image);
        formData.append("creatorName", post.creatorName);
        formData.append("createdOn", new Date().toISOString());
        return {
          url: "/api/v1/post",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),
    updatePost: builder.mutation({
      query: (initialPost) => ({
        url: `/api/v1/post/${initialPost?.id}`,
        method: "PATCH",
        body: {
          ...initialPost,
        },
      }),
      invalidatesTags: (result, err, arg) => [{ type: "Post", id: arg.id }],
    }),
    likePost: builder.mutation({
      query: ({ id, username }) => ({
        url: `/api/v1/post/like/${id}`,
        method: "PATCH",
        body: { id, username },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Post", id: arg.id }],
    }),
    comment: builder.mutation({
      query: ({ id, comment }) => ({
        url: `/api/v1/post/comment/${id}`,
        method: "PATCH",
        body: { id, comment },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Post", id: arg.id }],
    }),
    deletePost: builder.mutation({
      query: ({ id }) => ({
        url: `/api/v1/post/${id}`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Post", id: arg.id }],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useAddNewPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useLikePostMutation,
  useCommentMutation,
} = postsApiSlice;

export const selectPostsResult = postsApiSlice.endpoints.getPosts.select();

const selectPostsData = createSelector(
  selectPostsResult,
  (postsResult) => selectPostsResult.data
);

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors(
  (state) => selectPostsData(state) ?? initialState
);
