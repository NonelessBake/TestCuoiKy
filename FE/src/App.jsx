import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Home from "./pages/Home/Home";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { APP_CONFIG } from "./config/appConfig";
import { authService } from "./services/auth";
import { login } from "./store/slice/auth";

function App() {
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state) => state.auth);
  useEffect(() => {
    const fetchLogin = async () => {
      if (!isLogin) {
        if (localStorage.getItem(APP_CONFIG.STORAGE_TOKEN_NAME.REFRESH_TOKEN)) {
          const { accessToken, userInfo } = await authService.renewAccessToken(
            localStorage.getItem(APP_CONFIG.STORAGE_TOKEN_NAME.REFRESH_TOKEN)
          );
          dispatch(login({ accessToken, userInfo }));
        }
      }
    };
    fetchLogin();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          {["", "/home"].map((item, idx) => (
            <Route key={idx} path={item} element={<Home />} />
          ))}
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
