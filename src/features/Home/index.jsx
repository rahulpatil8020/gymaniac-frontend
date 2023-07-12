import React from "react";
import { useSelector } from "react-redux";
import { Skeleton, Grid, Box, Container, Stack } from "@mui/material";
import UserWidget from "./UserWidget";
import GoalsWidget from "./GoalsWidget";
import WidgetWrapper from "components/WidgetWrapper";
import AddPostWidget from "./AddPostWidget";
import PostWidget from "./PostWidget";

const HomePage = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <Container maxWidth="lg">
      <Grid sx={{ paddingTop: 3 }} container spacing={3}>
        <Grid height={"100%"} item xs={12} md={3}>
          <Box
            sx={{
              // maxHeight: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "left",
              justifyContent: "center",
            }}
          >
            <UserWidget />
            <Box
              sx={{
                marginTop: 5,
                height: "20rem",
                overflow: "hidden",
              }}
            >
              <GoalsWidget />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <AddPostWidget />
          {[1, 2, 3].map(() => (
            <PostWidget />
          ))}
        </Grid>
        <Grid item xs={12} md={3}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "left",
              justifyContent: "center",
            }}
          >
            <Box>
              <Skeleton variant="rounded" height="25vh" />
            </Box>
            <Box
              sx={{
                marginTop: 5,
                height: "20rem",
                overflow: "hidden",
              }}
            >
              <Skeleton variant="rounded" height="40vh" />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
