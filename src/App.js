import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "pages/HomePage";
import AuthPage from "pages/AuthPage";
import ProfilePage from "pages/ProfilePage";
import ChatPage from "pages/ChatPage";
import PrivateRoutes from "utils/PrivateRoutes";
// import Navbar from "components/Navbar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
