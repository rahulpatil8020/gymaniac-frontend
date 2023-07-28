import { Stack, Box, Typography, useTheme, IconButton } from "@mui/material";
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
import { useGetPostsQuery } from "./postsApiSlice";
import { useSelector } from "react-redux";
import Comments from "./Comments";

const PostWidget = ({ postId }) => {
  const { token } = useSelector((state) => state.auth);
  const [username, setUsername] = useState("");
  const { palette } = useTheme();
  const [hasUserLiked, setHasUserLiked] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const primary = palette.primary.main;

  const { post } = useGetPostsQuery("postsList", {
    selectFromResult: ({ data }) => ({
      post: data?.entities[postId],
    }),
  });

  const abortController = new AbortController();

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
  }, [post, username]);
  const handleCommentsOpen = () => {
    setCommentsOpen((prev) => !prev);
  };

  return (
    <WidgetWrapper sx={{ marginTop: 3 }}>
      <Stack spacing={2}>
        <FlexBetween>
          <FlexBetween>
            <AvatarAndName username={post?.creator} name="Rahul Patil" />
          </FlexBetween>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </FlexBetween>
        <Typography>{post.caption}</Typography>
        {post.image?.length !== 0 && (
          <Box
            sx={{
              height: 400,
              width: "100%",
              backgroundColor: palette.background.default,
            }}
          ></Box>
        )}
        <FlexBetween mt="0.25rem">
          <FlexBetween gap="1rem">
            <FlexBetween gap="0.3rem">
              <IconButton onClick={() => console.log("Liked")}>
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
        {commentsOpen && <Comments comments={post?.comments} />}
      </Stack>
    </WidgetWrapper>
  );
};

export default PostWidget;
