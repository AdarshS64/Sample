import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import EmpDetails from "../assets/constants";
import reducer from "../store/reducer";

import { useReducer, useState } from "react";

const HomeLayout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  console.log(token);
  const [state, dispatch] = useReducer(reducer, {
    employees: EmpDetails.details,
    status: "All",
  });

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

        <Outlet context={{ state: state, dispatch }} />
      </div>
    </>
  );
};

export default HomeLayout;
