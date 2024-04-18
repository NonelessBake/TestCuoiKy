import { Link } from "react-router-dom";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slice/auth";
import { APP_CONFIG } from "../../config/appConfig";
export default function Navbar() {
  const { isLogin, userInfo } = useSelector((state) => state.auth);
  const onLogout = () => {
    dispatch(logout());
    localStorage.removeItem(APP_CONFIG.STORAGE_TOKEN_NAME.REFRESH_TOKEN);
  };
  const dispatch = useDispatch();
  return (
    <div className="nav-bar-container">
      <label className="hamburger-menu">
        <input type="checkbox" />
      </label>
      <div className="sidebar">
        <nav>
          <Link to="/home">Home</Link>
          {isLogin ? (
            <div>
              <div>Welcome, {userInfo.username}</div>
              <button onClick={onLogout}>Logout</button>
            </div>
          ) : (
            <>
              <div>
                <Link to="/login">Login</Link>
              </div>
              <div>
                <Link to="/register">Register</Link>
              </div>
            </>
          )}
        </nav>
      </div>
    </div>
  );
}
