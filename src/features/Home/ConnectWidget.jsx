import { MessageRounded } from "@mui/icons-material";
import { Stack, Box, Typography, Divider, IconButton } from "@mui/material";
import AvatarAndName from "components/AvatarAndName";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import React from "react";
const ConnectWidget = () => {
  return (
    <WidgetWrapper>
      <Stack
        sx={{ height: "25vh" }}
        divider={<Divider orientation="horizontal" />}
        direction={"column"}
        spacing={1.7}
      >
        <Box sx={{ alignSelf: "center" }}>
          <Typography variant="h6">Connect</Typography>
        </Box>
        <Stack spacing={1.4}>
          {[1, 2, 3].map((i) => (
            <FlexBetween>
              <AvatarAndName />
              <IconButton>
                <MessageRounded />
              </IconButton>
            </FlexBetween>
          ))}
        </Stack>
      </Stack>
    </WidgetWrapper>
  );
};

export default ConnectWidget;
