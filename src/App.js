import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "pages/HomePage";
import AuthPage from "pages/AuthPage";
import ProfilePage from "pages/ProfilePage";
import ChatPage from "pages/ChatPage";
import PrivateRoutes from "utils/PrivateRoutes";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route exact path="/" element={<HomePage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
            <Route path="/auth" element={<AuthPage />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
