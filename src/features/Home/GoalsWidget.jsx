import {
  Stack,
  Typography,
  useTheme,
  Divider,
  Button,
  Checkbox,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import React, { useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const GoalsWidget = () => {
  const theme = useTheme();
  const [goals, setGoals] = useState([1, 3, 4, 5]);
  return (
    <WidgetWrapper>
      <Stack
        divider={<Divider orientation="horizontal" />}
        direction={"column"}
        spacing={1}
      >
        <Typography alignSelf={"center"} variant="h6">
          Workout Goals
        </Typography>
        <Stack>
          {goals.map((i) => (
            <FlexBetween>
              <Stack direction={"row"} alignItems="center">
                <Checkbox />
                <Typography>New Goal</Typography>
              </Stack>
              <Stack direction="row">
                <EditOutlinedIcon />
                <DeleteOutlineIcon />
              </Stack>
            </FlexBetween>
          ))}
        </Stack>
        <Button> Create a Goal</Button>
      </Stack>
    </WidgetWrapper>
  );
};

export default GoalsWidget;
