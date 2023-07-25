import { Divider } from "@mui/material";
import { Stack, Box, Typography, useTheme } from "@mui/material";
import AvatarAndName from "components/AvatarAndName";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import React from "react";
import { useSelector } from "react-redux";
import { selectUserInfo } from "features/User/userSlice";

const UserWidget = () => {
  // eslint-disable-next-line no-unused-vars
  const theme = useTheme();
  const userInfo = useSelector(selectUserInfo);
  const fullName = userInfo?.firstName + " " + userInfo?.lastName;
  return (
    <WidgetWrapper>
      <Stack
        sx={{ maxHeight: "25vh" }}
        divider={<Divider orientation="horizontal" />}
        direction={"column"}
        spacing={1}
      >
        <AvatarAndName username={userInfo?.username} name={fullName} />
        <Box>
          <FlexBetween>
            <Typography variant="h6">Level</Typography>
            <Typography variant="body">{userInfo?.level}</Typography>
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
