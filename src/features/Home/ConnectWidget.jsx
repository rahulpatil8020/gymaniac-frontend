import { MessageRounded } from "@mui/icons-material";
import {
  Stack,
  Box,
  Typography,
  Divider,
  IconButton,
  Button,
} from "@mui/material";
import AvatarAndName from "components/AvatarAndName";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
const ConnectWidget = () => {
  const [friendsList, setFriendsList] = useState([1, 2, 4, 5, 6, 7]);
  return (
    <WidgetWrapper>
      <Stack
        divider={<Divider orientation="horizontal" />}
        direction={"column"}
        spacing={1.7}
      >
        <Box sx={{ alignSelf: "center" }}>
          <Typography variant="h6">Connect</Typography>
        </Box>
        {friendsList.length && (
          <Stack spacing={1.4}>
            {friendsList.map((ele, i) => {
              if (i <= 3) {
                return (
                  <FlexBetween>
                    <AvatarAndName />
                    <IconButton>
                      <MessageRounded />
                    </IconButton>
                  </FlexBetween>
                );
              }
            })}
          </Stack>
        )}
        <Button>Add New Connections</Button>
      </Stack>
    </WidgetWrapper>
  );
};

export default ConnectWidget;
