import { Avatar, Stack, Typography, Divider, Box } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import React from "react";

const GymInfoWidget = () => {
  return (
    <WidgetWrapper>
      <Stack spacing={1} divider={<Divider />} direction="column">
        <Stack spacing={0.2} alignItems="center">
          <Avatar>GO</Avatar>
          <Typography variant="h6">Golds Gym</Typography>
          <Typography variant="body">25200 Santa Clara St</Typography>
        </Stack>
        <Stack spacing={0.5}>
          <FlexBetween>
            <Typography variant="h6">Membership</Typography>
            <Typography>Premium</Typography>
          </FlexBetween>
          <FlexBetween>
            <Typography variant="h6">Fees</Typography>
            <Typography>50$/month</Typography>
          </FlexBetween>
          <FlexBetween>
            <Typography variant="h6">Due</Typography>
            <Typography>10 days</Typography>
          </FlexBetween>
        </Stack>
      </Stack>
    </WidgetWrapper>
  );
};

export default GymInfoWidget;
