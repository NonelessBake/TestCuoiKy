import Navbar from "../NavbarHeader/Navbar";
import "./index.css";
import { IoMdSearch } from "react-icons/io";

export default function Header() {
  return (
    <header className="flex justify-between" style={{ position: "relative" }}>
      <div style={{ position: "relative" }}>
        <Navbar />
      </div>
      <div>Logo</div>
      <div className="p-100">
        <IoMdSearch size={30} />
      </div>
    </header>
  );
}
