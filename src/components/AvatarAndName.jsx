import React from "react";
import { Box, Avatar, Typography, useTheme } from "@mui/material";

const AvatarAndName = () => {
  const theme = useTheme();
  return (
    <Box sx={{ display: "flex" }}>
      <Avatar
        sx={{
          bgcolor: theme.palette.neutral.mediumMain,
          marginRight: 2,
        }}
      >
        RP
      </Avatar>
      <Box>
        <Typography variant="h6">Rahul Patil</Typography>
        <Typography variant="body1">rahulpatil20</Typography>
      </Box>
    </Box>
  );
};

export default AvatarAndName;
