import { Avatar, Stack, Typography, Divider, Button } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import React, { useState } from "react";

const GymInfoWidget = () => {
  // eslint-disable-next-line no-unused-vars
  const [isMember, setIsMember] = useState(true);

  return (
    <WidgetWrapper>
      <Stack spacing={1} divider={<Divider />} direction="column">
        <Typography alignSelf="center" variant="h6">
          Membership
        </Typography>

        {isMember && (
          <>
            {" "}
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
          </>
        )}
      </Stack>
      <Button sx={{ marginTop: 2 }}>Find Gyms / Trainer </Button>
    </WidgetWrapper>
  );
};

export default GymInfoWidget;
