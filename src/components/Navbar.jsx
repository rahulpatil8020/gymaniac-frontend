import React, { useState, useEffect } from "react";
import FlexBetween from "./FlexBetween";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
  Tooltip,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "../app/slices/themeModeSlice";
import { useNavigate } from "react-router-dom";
import { selectCurrentToken } from "features/Auth/authSlice";
import jwtDecode from "jwt-decode";
import { useSendLogoutMutation } from "features/Auth/authApiSlice";
import InputAndIcon from "./InputAndIcon";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const [fullName, setFullName] = useState("User");
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearch = () => {};

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const alt = theme.palette.background.alt;
  const token = useSelector(selectCurrentToken);
  const abortController = new AbortController();

  useEffect(() => {
    if (isSuccess) navigate("/auth", { replace: true });
  }, [isSuccess, navigate]);

  useEffect(() => {
    const decoded = jwtDecode(token);
    setFullName(decoded?.username);
    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <FlexBetween padding="1rem 6%" backgroundColor={alt}>
        <FlexBetween gap="1.75rem">
          <Typography
            fontWeight="bold"
            fontSize="clamp(1rem, 2rem, 2.25rem)"
            color="primary"
            onClick={() => navigate("/")}
            sx={{
              "&:hover": {
                color: dark,
                cursor: "pointer",
              },
            }}
          >
            Gymaniac
          </Typography>
          {isNonMobileScreens && (
            <InputAndIcon
              value={searchText}
              onChange={handleSearchChange}
              placeholder={"Search..."}
              iconButton={
                <IconButton onClick={handleSearch}>
                  <Search />
                </IconButton>
              }
              backgroundColor={neutralLight}
            />
          )}
        </FlexBetween>

        {/* DESKTOP NAV */}

        {isNonMobileScreens ? (
          <FlexBetween gap="2rem">
            <Tooltip title={"Change Mode"}>
              <IconButton onClick={() => dispatch(setMode())}>
                {theme.palette.mode === "dark" ? (
                  <DarkMode sx={{ fontSize: "25px" }} />
                ) : (
                  <LightMode sx={{ color: dark, fontSize: "25px" }} />
                )}
              </IconButton>
            </Tooltip>
            <Tooltip title="Messages">
              <IconButton>
                <Message sx={{ fontSize: "25px" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Notifications">
              <IconButton>
                <Notifications sx={{ fontSize: "25px" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Help">
              <IconButton>
                <Help sx={{ fontSize: "25px" }} />
              </IconButton>
            </Tooltip>
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select: focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={sendLogout}>Log Out</MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        ) : (
          <IconButton
            onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
          >
            <Menu />
          </IconButton>
        )}

        {/* MOBILE NAV */}

        {!isNonMobileScreens && isMobileMenuToggled && (
          <Box
            position="fixed"
            right="0"
            bottom="0"
            height="100%"
            zIndex="10"
            maxWidth="500px"
            minWidth="300px"
            backgroundColor={background}
          >
            {/* CLOSE ICON */}

            <Box display="flex" justifyContent="flex-end" p="1rem">
              <IconButton
                onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
              >
                <Close />
              </IconButton>
            </Box>

            {/* MENU ITEMS */}

            <FlexBetween
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap="3rem"
            >
              <IconButton
                onClick={() => dispatch(setMode())}
                sx={{ fontSize: "25px" }}
              >
                {theme.palette.mode === "dark" ? (
                  <DarkMode sx={{ fontSize: "25px" }} />
                ) : (
                  <LightMode sx={{ color: dark, fontSize: "25px" }} />
                )}
              </IconButton>
              <Tooltip title="Messages">
                <IconButton>
                  <Message sx={{ color: dark, fontSize: "25px" }} />
                </IconButton>
              </Tooltip>
              <IconButton>
                <Notifications sx={{ color: dark, fontSize: "25px" }} />
              </IconButton>
              <IconButton>
                <Help sx={{ color: dark, fontSize: "25px" }} />
              </IconButton>
              <FormControl variant="standard" value={fullName}>
                <Select
                  value={fullName}
                  sx={{
                    backgroundColor: neutralLight,
                    width: "150px",
                    borderRadius: "0.25rem",
                    p: "0.25rem 1rem",
                    "& .MuiSvgIcon-root": {
                      pr: "0.25rem",
                      width: "3rem",
                    },
                    "& .MuiSelect-select:focus": {
                      backgroundColor: neutralLight,
                    },
                  }}
                  input={<InputBase />}
                >
                  <MenuItem value={fullName}>
                    <Typography>{fullName}</Typography>
                  </MenuItem>
                  <MenuItem onClick={sendLogout}>Log Out</MenuItem>
                </Select>
              </FormControl>
            </FlexBetween>
          </Box>
        )}
      </FlexBetween>
    </>
  );
};

export default Navbar;
