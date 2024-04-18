import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
export default function RootLayout() {
  return (
    <div className="layout-container">
      <div>
        <Header />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
