import {
  Avatar,
  Divider,
  Stack,
  useTheme,
  InputBase,
  Tooltip,
  Button,
  IconButton,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import React, { useState, useEffect } from "react";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CloseIcon from "@mui/icons-material/Close";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { selectUserInfo } from "features/User/userSlice";
import { useAddNewPostMutation } from "features/Posts/postsApiSlice";

const AddPostWidget = () => {
  const theme = useTheme();
  const [image, setImage] = useState(null);
  const [multiline, setMultiline] = useState(false);
  const [caption, setCaption] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const userInfo = useSelector(selectUserInfo);
  const abortController = new AbortController();

  const [addNewPost, { isLoading, isSuccess, isError, error }] =
    useAddNewPostMutation();

  const handleCancelImage = () => {
    setImage("");
  };

  const handlePostUpload = async () => {
    if (!userInfo?.username) return;
    if (!caption && !image) {
      setErrMsg("Please enter a caption or an image");
      return;
    }

    const userFullName = userInfo?.firstName + " " + userInfo?.lastName;
    const postData = {
      creator: userInfo?.username,
      creatorName: userFullName,
      caption: caption,
      image: image,
    };

    try {
      await addNewPost(postData);
      setCaption("");
      setImage("");
    } catch (error) {
      setErrMsg(error?.data?.message);
    }
  };

  useEffect(() => {
    return () => {
      abortController.abort();
    };
  }, []); // eslint-disable-line

  function handleImageUpload(e) {
    if (e.target.files) {
      let file = e.target.files[0];
      setImage(file);
    }
  }

  // function encodeImageFileAsURL(file) {
  //   var reader = new FileReader();
  //   if (reader) {
  //     reader.onloadend = function () {
  //       setImage(reader?.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }
  return (
    <>
      <Snackbar
        open={errMsg?.length === 0 ? false : true}
        onClose={() => setErrMsg("")}
        autoHideDuration={3000}
      >
        <Alert severity="error">{errMsg}</Alert>
      </Snackbar>
      <WidgetWrapper>
        {isLoading ? (
          <Typography variant="h6">Uploading the post....</Typography>
        ) : (
          <Stack
            spacing={2}
            direction={"column"}
            divider={<Divider orientation="horizontal" />}
          >
            <FlexBetween gap="1rem">
              <Avatar>RP</Avatar>
              <InputBase
                value={caption}
                autoFocus={multiline}
                placeholder="What's on your mind..."
                onChange={(e) => setCaption(e.target.value)}
                onFocus={() => setMultiline(true)}
                onBlur={() => setMultiline(false)}
                multiline={multiline}
                rows={multiline ? 4 : 1}
                sx={{
                  width: "100%",
                  backgroundColor: theme.palette.neutral.light,
                  borderRadius: "1rem",
                  padding: "1rem 1rem",
                }}
              />
            </FlexBetween>
            <FlexBetween>
              <Stack alignItems="center" spacing={2} direction={"row"}>
                <input
                  onChange={handleImageUpload}
                  accept="image/*"
                  style={{ display: "none" }}
                  id="icon-button-file"
                  type="file"
                />
                <Tooltip title="Add Attachment">
                  <label htmlFor="icon-button-file">
                    <IconButton aria-label="upload picture" component="span">
                      <AttachFileOutlinedIcon />
                    </IconButton>
                  </label>
                </Tooltip>
                {image && (
                  <Stack alignItems="center" direction="row" spacing={1}>
                    <Typography
                      textAlign={"center"}
                      backgroundColor={theme.palette.neutral.light}
                      width={100}
                      noWrap
                      textOverflow={"ellipsis"}
                    >
                      {image?.name}
                    </Typography>
                    <IconButton onClick={handleCancelImage}>
                      <CloseIcon />
                    </IconButton>
                  </Stack>
                )}
                <IconButton onClick={() => console.log("Location clicked")}>
                  <LocationOnIcon />
                </IconButton>
              </Stack>
              <Button disabled={isLoading} onClick={handlePostUpload}>
                Post
              </Button>
            </FlexBetween>
          </Stack>
        )}
      </WidgetWrapper>
    </>
  );
};

export default AddPostWidget;
