import { Link, Outlet } from "react-router-dom";
import icon from "../assets/icon.svg";
import logo from "../assets/kv-logo.png";

const Sidebar = () => {
  const onChange = () => {
    localStorage.removeItem("token");
    console.log("hi");
  };

  const sideOptions = [
    {
      name: "Employee Create",
      class: "nav-li",
      link: "/employee/create",
    },
    {
      name: "Employee list",
      class: "nav-li",
      link: "/employee",
    },
    {
      name: "Logout",
      class: "nav-li-log",
      link: "/",
      onchange: onChange,
    },
  ];
  return (
    <>
      <aside>
        <div className="logo">
          <img src={logo} alt="KeyValue Systems logo" />
        </div>
        <br />
        <div className="nav-items">
          <ul>
            {sideOptions.map((options) => {
              return (
                <>
                  <li className={options.class}>
                    <Link to={options.link} onClick={options.onchange}>
                      <span>
                        <img src={icon} alt="KeyValue Systems logo" />
                      </span>
                      {options.name}
                    </Link>
                  </li>
                </>
              );
            })}

            {/* <li className="nav-li">
              <a>
                <span>
                  <img src={icon} alt="KeyValue Systems logo" />
                </span>
                Employee List
              </a>
            </li>

            <li className="nav-li">
              <a>
                <span>
                  <img src={icon} alt="KeyValue Systems logo" />
                </span>
                List Employee
              </a>
            </li>

            <li className="nav-li-log">
              <a>
                <span>
                  <img src={icon} alt="KeyValue Systems logo" />
                </span>
                Logout
              </a>
            </li> */}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
