import {
  Avatar,
  Divider,
  Stack,
  useTheme,
  InputBase,
  Tooltip,
  Button,
  IconButton,
  Modal,
  Box,
  Typography,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import React, { useState } from "react";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
// import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import WidgetWrapper from "components/WidgetWrapper";

const AddPostWidget = () => {
  const theme = useTheme();
  const mediumMain = theme.palette.neutral.mediumMain;
  const [postText, setPostText] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => {
    console.log(postText);
    setShowModal(false);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    borderRadius: "15px",
    boxShadow: 24,
    p: 2,
  };
  return (
    <>
      <Modal open={showModal}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            What's On Your Mind...
          </Typography>
          <InputBase
            onChange={(e) => setPostText(e.target.value)}
            autoFocus
            sx={{
              width: "100%",
              backgroundColor: theme.palette.neutral.light,
              padding: "1rem 1rem",
            }}
            multiline
            minRows={4}
          ></InputBase>
          <Button onClick={handleCloseModal}>Close</Button>
        </Box>
      </Modal>
      <WidgetWrapper>
        <Stack
          spacing={2}
          direction={"column"}
          divider={<Divider orientation="horizontal" />}
        >
          <FlexBetween gap="1rem">
            <Avatar>RP</Avatar>
            <InputBase
              placeholder="What's on your mind..."
              onChange={(e) => console.log(`What's on your mind`)}
              // value={post}
              sx={{
                width: "100%",
                backgroundColor: theme.palette.neutral.light,
                borderRadius: "2rem",
                padding: "1rem 1rem",
              }}
            />
          </FlexBetween>
          <FlexBetween>
            <Tooltip title="Add Attachment">
              <label htmlFor="icon-button-file">
                <IconButton
                  onClick={handleOpenModal}
                  aria-label="upload picture"
                  component="span"
                >
                  <AttachFileOutlinedIcon />
                </IconButton>
              </label>
            </Tooltip>

            <Button>Post</Button>
          </FlexBetween>
        </Stack>
      </WidgetWrapper>
    </>
  );
};

export default AddPostWidget;
