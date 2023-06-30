import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "features/Home";
import AuthPage from "features/Auth";
import ProfilePage from "features/User";
import ChatPage from "features/Chat";
import PrivateRoutes from "utils/PrivateRoutes";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import PersistLogin from "features/Auth/PersistLogin";

function App() {
  const mode = useSelector((state) => state.themeMode.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route element={<PersistLogin />}>
              <Route element={<PrivateRoutes />}>
                <Route exact path="/" element={<HomePage />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Route>
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
