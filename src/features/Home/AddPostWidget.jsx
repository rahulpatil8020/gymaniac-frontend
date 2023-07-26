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
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import React, { useState } from "react";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CloseIcon from "@mui/icons-material/Close";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { selectUserInfo } from "features/User/userSlice";
import { useAddNewPostMutation } from "features/Posts/postsApiSlice";
import { useEffect } from "react";

const AddPostWidget = () => {
  const theme = useTheme();
  const [imageMetadata, setImageMetadata] = useState(null);
  const [imageURL, setImageURL] = useState("null");
  const [multiline, setMultiline] = useState(false);
  const [caption, setCaption] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const userInfo = useSelector(selectUserInfo);
  const abortController = new AbortController();

  const [addNewPost, { isLoading, isSuccess, isError, error }] =
    useAddNewPostMutation();

  const handleCancelImage = () => {
    setImageMetadata(null);
    setImageURL("");
  };

  const handlePostUpload = async () => {
    if (!userInfo?.username) return;
    console.log("Uploading");
    let postData = {
      creator: userInfo?.username,
      caption: caption,
      createdOn: new Date(),
      image: imageURL,
      imageMetadata: {
        name: imageMetadata?.name,
        type: imageMetadata?.type,
        lastModifiedDate: imageMetadata?.lastModifiedDate,
      },
    };

    try {
      await addNewPost(postData).unwrap();
      setCaption("");
      setImageMetadata(null);
      setImageURL("");
    } catch (error) {
      setErrMsg(error?.data?.message);
    }
    // try {
    //   const { accessToken } = await login({ username, password }).unwrap();
    //   dispatch(setCredentials({ accessToken }));
    //   navigate("/", {
    //     replace: true,
    //   });
    // } catch (error) {
    //   setErrMsg(error?.data?.message);
    // }
  };

  useEffect(() => {
    return () => {
      abortController.abort();
    };
  }, []);

  function handleImageUpload(e) {
    let file = e.target.files[0];
    encodeImageFileAsURL(file);
    setImageMetadata(file);
  }

  function encodeImageFileAsURL(file) {
    var reader = new FileReader();
    reader.onloadend = function () {
      setImageURL(reader.result);
    };
    reader.readAsDataURL(file);
  }

  return (
    <>
      <WidgetWrapper>
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
              {imageMetadata && (
                <Stack alignItems="center" direction="row" spacing={1}>
                  <Typography
                    textAlign={"center"}
                    backgroundColor={theme.palette.neutral.light}
                    width={100}
                    noWrap
                    textOverflow={"ellipsis"}
                  >
                    {imageMetadata?.name}
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
            <Button onClick={handlePostUpload}>Post</Button>
          </FlexBetween>
        </Stack>
      </WidgetWrapper>
    </>
  );
};

export default AddPostWidget;
