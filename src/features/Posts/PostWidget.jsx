import {
  Stack,
  Box,
  Typography,
  useTheme,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import WidgetWrapper from "components/WidgetWrapper";
import AvatarAndName from "components/AvatarAndName";
import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import {
  FavoriteOutlined,
  FavoriteBorderOutlined,
  ChatBubbleOutlineOutlined,
  ShareOutlined,
  ChatBubbleTwoTone,
} from "@mui/icons-material";
import {
  useGetPostsQuery,
  useDeletePostMutation,
  useUpdatePostMutation,
  useLikePostMutation,
} from "./postsApiSlice";
import { useSelector } from "react-redux";
import Comments from "./Comments";
import moment from "moment";

const PostWidget = ({ postId }) => {
  const { token } = useSelector((state) => state.auth);
  const [username, setUsername] = useState("");
  const { palette } = useTheme();
  const [hasUserLiked, setHasUserLiked] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const primary = palette.primary.main;
  const mediumMain = palette.neutral.mediumMain;

  const abortController = new AbortController();

  const { post } = useGetPostsQuery("postsList", {
    selectFromResult: ({ data }) => ({
      post: data?.entities[postId],
    }),
  });

  const [
    deletePost,
    {
      isLoading: isDelLoading,
      isSuccess: isDelSuccess,
      isError: isDelError,
      error: delError,
    },
  ] = useDeletePostMutation();

  const [
    updatePost,
    {
      isLoading: isUpdateLoading,
      isSuccess: isUpdateSuccess,
      isError: isUpdateError,
      error: updateError,
    },
  ] = useUpdatePostMutation();

  const [
    likePost,
    {
      isLoading: isLikeLoading,
      isSuccess: isLikeSuccess,
      isError: isLikeError,
      error: likeError,
    },
  ] = useLikePostMutation();

  useEffect(() => {
    const decoded = jwtDecode(token);
    setUsername(decoded?.username);
    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (post?.likedBy?.includes(username)) setHasUserLiked(true);
    else setHasUserLiked(false);
  }, [post, username]);
  const handleCommentsOpen = () => {
    setCommentsOpen((prev) => !prev);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeletePost = async () => {
    await deletePost({ id: post.id });
    setAnchorEl(null);
  };

  const handleLikePost = async () => {
    await likePost({ id: post.id, username });
  };

  return (
    <WidgetWrapper sx={{ marginTop: 3 }}>
      <Stack spacing={2}>
        <FlexBetween>
          <FlexBetween>
            <AvatarAndName username={post?.creator} name={post?.creatorName} />
          </FlexBetween>
          <IconButton onClick={handleClick}>
            <MoreVertIcon
              id="demo-positioned-button"
              aria-controls={open ? "demo-positioned-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            />
          </IconButton>
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <MenuItem onClick={handleClose}>Update</MenuItem>
            <MenuItem onClick={handleDeletePost}>Delete</MenuItem>
            {/* <MenuItem onClick={handleClose}>Logout</MenuItem> */}
          </Menu>
        </FlexBetween>
        <Typography>{post.caption}</Typography>
        <Typography color={mediumMain}>
          {moment(post.createdOn).fromNow()}
        </Typography>

        {post?.imageURL && (
          <Box
            component="img"
            sx={{
              width: "100%",
              backgroundColor: palette.background.default,
            }}
            alt="post"
            src={post?.imageURL}
          />
        )}
        <FlexBetween mt="0.25rem">
          <FlexBetween gap="1rem">
            <FlexBetween gap="0.3rem">
              <IconButton onClick={handleLikePost}>
                {hasUserLiked ? (
                  <FavoriteOutlined
                    sx={{
                      color: hasUserLiked ? primary : null,
                    }}
                  />
                ) : (
                  <FavoriteBorderOutlined />
                )}
              </IconButton>
              <Typography>{post?.likedBy?.length}</Typography>
            </FlexBetween>
            <FlexBetween gap="0.3rem">
              <IconButton onClick={handleCommentsOpen}>
                {commentsOpen ? (
                  <ChatBubbleTwoTone />
                ) : (
                  <ChatBubbleOutlineOutlined />
                )}
              </IconButton>
              <Typography>{post?.comments?.length}</Typography>
            </FlexBetween>
          </FlexBetween>

          <IconButton>
            <ShareOutlined />
          </IconButton>
        </FlexBetween>
        {commentsOpen && (
          <Comments
            postId={postId}
            username={username}
            comments={post?.comments}
          />
        )}
      </Stack>
    </WidgetWrapper>
  );
};

export default PostWidget;
