import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const HomeLayout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  console.log(token);

  useEffect(() => {
    if (!token) {
      console.log(token, "effect");
      navigate("/");
    }
  });
  return (
    <>
      <div className="whole">
        <Sidebar></Sidebar>

        <Outlet />
      </div>
    </>
  );
};

export default HomeLayout;
