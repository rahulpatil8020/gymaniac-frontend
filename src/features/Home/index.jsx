import React from "react";
import { useSelector } from "react-redux";
import { Grid, Box, Container } from "@mui/material";
import UserWidget from "./UserWidget";
import GoalsWidget from "./GoalsWidget";
import AddPostWidget from "./AddPostWidget";
import PostWidget from "./PostWidget";
import GymInfoWidget from "./GymInfoWidget";
import ConnectWidget from "./ConnectWidget";

const HomePage = () => {
  // eslint-disable-next-line no-unused-vars
  const { user } = useSelector((state) => state.auth);
  return (
    <Container maxWidth="lg">
      <Grid sx={{ paddingTop: 3 }} container spacing={3}>
        <Grid item xs={12} md={3}>
          <Box
            sx={{
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
                overflow: "hidden",
              }}
            >
              <GoalsWidget />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <AddPostWidget />
          {[1, 2, 3].map((id) => (
            <PostWidget key={id} />
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
              <GymInfoWidget />
            </Box>
            <Box
              sx={{
                marginTop: 5,
                overflow: "hidden",
              }}
            >
              <ConnectWidget />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
