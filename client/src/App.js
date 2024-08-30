import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Forgot from "./pages/Forgot";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import Notfound from "./pages/Notfound";
import PrivateRoutes from "./pages/PrivateRoutes";
import PublicRoute from "./pages/PublicRoute";

function App() {
  const [token, setToken] = useState("");
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Notfound />} />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <Forgot />
            </PublicRoute>
          }
        />
        <Route
          path="/forgot-password/change-password"
          element={
            <PublicRoute>
              <ChangePassword />
            </PublicRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoutes>
              <Profile />
            </PrivateRoutes>
          }
        />
      </Routes>
    </>
  );
}

export default App;
