import {
  Stack,
  Box,
  Avatar,
  Typography,
  useTheme,
  IconButton,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import WidgetWrapper from "components/WidgetWrapper";
import AvatarAndName from "components/AvatarAndName";
import { useState } from "react";
import {
  FavoriteOutlined,
  FavoriteBorderOutlined,
  ChatBubbleOutlineOutlined,
  ShareOutlined,
} from "@mui/icons-material";

const PostWidget = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(false);
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  return (
    <WidgetWrapper sx={{ marginTop: 3 }}>
      <Stack spacing={2}>
        <FlexBetween>
          <FlexBetween>
            <AvatarAndName />
          </FlexBetween>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </FlexBetween>
        <Typography>This is the comment ... </Typography>
        <Box
          sx={{
            height: 400,
            width: "100%",
            backgroundColor: palette.background.default,
          }}
        ></Box>
        <FlexBetween mt="0.25rem">
          <FlexBetween gap="1rem">
            <FlexBetween gap="0.3rem">
              <IconButton onClick={() => console.log("Liked")}>
                {isLiked ? (
                  <FavoriteOutlined sx={{ color: primary }} />
                ) : (
                  <FavoriteBorderOutlined />
                )}
              </IconButton>
              <Typography>20</Typography>
            </FlexBetween>

            <FlexBetween gap="0.3rem">
              <IconButton onClick={() => console.log("Comment")}>
                <ChatBubbleOutlineOutlined />
              </IconButton>
              <Typography>5</Typography>
            </FlexBetween>
          </FlexBetween>

          <IconButton>
            <ShareOutlined />
          </IconButton>
        </FlexBetween>
      </Stack>
    </WidgetWrapper>
  );
};

export default PostWidget;
