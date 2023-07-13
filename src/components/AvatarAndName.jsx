import React from "react";
import { Box, Avatar, Typography, useTheme, Stack } from "@mui/material";
import avatarImage from "../assets/1.jpg";

const AvatarAndName = () => {
  const theme = useTheme();
  const mediumMain = theme.palette.neutral.mediumMain;
  const dark = theme.palette.neutral.dark;
  return (
    <Box sx={{ display: "flex" }}>
      <Avatar
        src={avatarImage}
        sx={{
          // bgcolor: theme.palette.neutral.mediumMain,
          marginRight: 1.5,
        }}
      />

      <Stack>
        <Typography
          color={dark}
          sx={{ paddingTop: 0.5 }}
          lineHeight={0.8}
          variant="h6"
        >
          Rahul Patil
        </Typography>
        <Typography color={mediumMain} variant="body1">
          rahulpatil20
        </Typography>
      </Stack>
    </Box>
  );
};

export default AvatarAndName;
