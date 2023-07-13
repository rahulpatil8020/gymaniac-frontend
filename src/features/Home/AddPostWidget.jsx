import {
  Avatar,
  Divider,
  Stack,
  useTheme,
  InputBase,
  Tooltip,
  Button,
  IconButton,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import React from "react";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import WidgetWrapper from "components/WidgetWrapper";

const AddPostWidget = () => {
  const theme = useTheme();
  const mediumMain = theme.palette.neutral.mediumMain;

  return (
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
            <IconButton>
              <AttachFileOutlinedIcon sx={{ color: mediumMain }} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Add Workout Plan">
            <IconButton>
              <FitnessCenterIcon sx={{ color: mediumMain }} />{" "}
            </IconButton>
          </Tooltip>

          <Button>Post</Button>
        </FlexBetween>
      </Stack>
    </WidgetWrapper>
  );
};

export default AddPostWidget;
