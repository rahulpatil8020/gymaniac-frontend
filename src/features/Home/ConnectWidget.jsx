import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
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
  // eslint-disable-next-line no-unused-vars
  const [friendsList, setFriendsList] = useState([1, 2, 4, 5, 6, 7]);
  return (
    <WidgetWrapper>
      <Stack
        divider={<Divider orientation="horizontal" />}
        direction={"column"}
        spacing={1}
      >
        <Box sx={{ alignSelf: "center" }}>
          <Typography variant="h6">Connect</Typography>
        </Box>
        {friendsList.length && (
          <Stack spacing={1.4}>
            {friendsList.map(function (ele, i) {
              if (i <= 3) {
                return (
                  <FlexBetween key={i}>
                    <AvatarAndName username="rahulpatil" name="Rahul Patil" />
                    <IconButton>
                      <MessageOutlinedIcon />
                    </IconButton>
                  </FlexBetween>
                );
              }
              return null;
            })}
          </Stack>
        )}
      </Stack>
      <Button sx={{ marginTop: 2 }}>Add New Connections</Button>
    </WidgetWrapper>
  );
};

export default ConnectWidget;
