import { Stack, Box, Typography, useTheme, Divider } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import React from "react";

const GoalsWidget = () => {
  const theme = useTheme();
  return (
    <WidgetWrapper>
      <Stack
        sx={{ height: "25vh" }}
        divider={<Divider orientation="horizontal" />}
        direction={"column"}
        spacing={1}
      >
        <Box sx={{ alignSelf: "center" }}>
          <Typography variant="h6">Goals</Typography>
        </Box>
        <Box>
          {[1, 2, 3].map((i) => (
            <Typography>New Goal</Typography>
          ))}
        </Box>
      </Stack>
    </WidgetWrapper>
  );
};

export default GoalsWidget;
