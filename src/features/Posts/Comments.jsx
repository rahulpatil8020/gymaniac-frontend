import {
  Divider,
  InputBase,
  Stack,
  Typography,
  useTheme,
  IconButton,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import InputAndIcon from "components/InputAndIcon";

const Comments = ({ comments }) => {
  const theme = useTheme();
  const mediumMain = theme.palette.neutral.mediumMain;
  const neutralLight = theme.palette.neutral.light;
  const [comment, setComment] = useState("");
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };
  const handleAddComment = () => {};
  return (
    <>
      {comments.length !== 0 ? (
        <Stack divider={<Divider />} spacing={1}>
          {comments.map((comment) => (
            <Stack spacing={0.3}>
              <Stack spacing={2} direction="row">
                <Typography variant="h6">{comment?.commentBy}</Typography>
                <Typography
                  color={mediumMain}
                  alignSelf={"center"}
                  fontSize={10}
                >
                  {comment?.commentOn}
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
          <IconButton onClick={handleAddComment}>
            <SendIcon />
          </IconButton>
        }
        placeholder={"Add a comment..."}
        value={comment}
        onChange={handleCommentChange}
      />
    </>
  );
};

export default Comments;
