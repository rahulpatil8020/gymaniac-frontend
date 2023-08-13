import {
  Divider,
  Stack,
  Typography,
  useTheme,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import InputAndIcon from "components/InputAndIcon";
import { useCommentMutation } from "./postsApiSlice";
import moment from "moment";

const Comments = ({ username, comments, postId }) => {
  const theme = useTheme();
  const mediumMain = theme.palette.neutral.mediumMain;
  const neutralLight = theme.palette.neutral.light;
  const [commentText, setCommentText] = useState("");

  const [comment, { isLoading, isSuccess, isError, error }] =
    useCommentMutation();

  const handleUploadComment = async () => {
    if (commentText.length > 0) {
      const commentData = {
        commentText: commentText,
        commentBy: username,
        commentOn: new Date(),
      };
      console.log(commentData, postId);
      await comment({ id: postId, comment: commentData });
      setCommentText("");
    }
  };

  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };
  return (
    <>
      {comments.length !== 0 ? (
        <Stack divider={<Divider />} spacing={1}>
          {comments.map((comment) => (
            <Stack key={comment.commentOn} spacing={0.3}>
              <Stack spacing={2} direction="row">
                <Typography variant="h6">{comment?.commentBy}</Typography>
                <Typography
                  color={mediumMain}
                  alignSelf={"center"}
                  fontSize={10}
                >
                  {moment(comment.commentOn).fromNow()}
                </Typography>
              </Stack>
              <Typography>{comment?.commentText}</Typography>
            </Stack>
          ))}
        </Stack>
      ) : (
        <Typography>No comments</Typography>
      )}
      <InputAndIcon
        fullWidth
        backgroundColor={neutralLight}
        iconButton={
          <IconButton onClick={handleUploadComment}>
            <SendIcon />
          </IconButton>
        }
        placeholder={"Add a comment..."}
        value={commentText}
        onChange={handleCommentChange}
      />
    </>
  );
};

export default Comments;
