import { Divider } from "@mui/material";
import { Stack, Box, Avatar, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import React from "react";

const UserWidget = () => {
  const theme = useTheme();

  return (
    <WidgetWrapper>
      <Stack
        sx={{ maxHeight: "25vh" }}
        divider={<Divider orientation="horizontal" />}
        direction={"column"}
        spacing={1}
      >
        <Box sx={{ display: "flex" }}>
          <Avatar
            sx={{ bgcolor: theme.palette.neutral.mediumMain, marginRight: 2 }}
          >
            RP
          </Avatar>
          <Box>
            <Typography variant="h6">Rahul Patil</Typography>
            <Typography variant="body1">rahulpatil20</Typography>
          </Box>
        </Box>
        <Box>
          <FlexBetween>
            <Typography variant="h6">Level</Typography>
            <Typography variant="body">Beginner</Typography>
          </FlexBetween>
          <FlexBetween>
            <Typography variant="h6">Challenges</Typography>
            <Typography variant="body">0</Typography>
          </FlexBetween>
          <FlexBetween>
            <Typography variant="h6">Posts</Typography>
            <Typography variant="body">0</Typography>
          </FlexBetween>
        </Box>
      </Stack>
    </WidgetWrapper>
  );
};

export default UserWidget;