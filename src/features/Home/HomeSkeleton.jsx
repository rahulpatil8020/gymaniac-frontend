import React from "react";
import { Skeleton, Grid, Box, Container } from "@mui/material";

const HomeSkeleton = () => {
  return (
    <Container maxWidth="xl">
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
        <Grid item xs={12} md={6}>
          <Skeleton variant="rounded" height={"85vh"} />
        </Grid>
        <Grid item xs={12} md={3}>
          <Box
            sx={{
              // maxHeight: "100%",
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

export default HomeSkeleton;
