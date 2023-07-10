import { Stack, Box, Avatar, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import WidgetWrapper from "components/WidgetWrapper";

const PostWidget = () => {
  const theme = useTheme();
  return (
    <WidgetWrapper sx={{ marginTop: 3 }}>
      <Stack spacing={2}>
        <FlexBetween>
          <FlexBetween>
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
          </FlexBetween>
          <MoreVertIcon />
        </FlexBetween>
        <Typography>This is the comment ... </Typography>
        <Box
          sx={{
            height: 400,
            width: "100%",
            backgroundColor: theme.palette.background.default,
          }}
        ></Box>
      </Stack>
    </WidgetWrapper>
  );
};

export default PostWidget;
