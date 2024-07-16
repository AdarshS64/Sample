import { useParams } from "react-router-dom";
import DeleteLogo from "../assets/delete.svg";
import EditLogo from "../assets/edit.svg";
import SelectField from "../components/SelectField";
import { useNavigate } from "react-router-dom";
import EmpDetails from "../assets/constants";
import Modal from "../components/Modal";
import { useState } from "react";

const EmployeeList = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [showDelete, setShowDelete] = useState(false);

  const empHeaders = EmpDetails.headers;

  const empDetails = EmpDetails.details;

  const getColor = (options) => {
    console.log(options);
    if (options == "Probation") {
      return "header-probation";
    } else if (options == "Active") {
      return "header-active";
    } else if (options == "Inactive") {
      return "header-inactive";
    }
    return "header-options";
  };

  const onClick = (id) => {
    navigate(`edit/${id}`);
  };

  const onSelect = (id) => {
    navigate(`details/${id}`);
  };

  const onDelete = () => {
    return setShowDelete(!showDelete);
  };

  return (
    <>
      <div className="whole">
        <main>
          <div className="content">
            <div className="heading">
              <h2>Employee List</h2>
              <div className="employee-filter-section">
                <div className="filter-section">
                  <SelectField label="Filter By"></SelectField>
                </div>
                <div className="create-section">
                  <span className="create-employee-plus">+</span>
                  <span className="create-employee-text">Create Employee</span>
                </div>
              </div>
            </div>
            <div className="emp-data">
              <div className="data-heading">
                {Object.keys(empHeaders).map((options) => {
                  if (options != "address") {
                    return (
                      <>
                        <span className="header-options">
                          {empHeaders[options]}
                        </span>
                      </>
                    );
                  }
                })}
              </div>
              <br />
              <div className="data-details">
                {empDetails.map((value) => {
                  return (
                    <div
                      className="data-rows"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelect(value.id);
                      }}
                    >
                      {console.log(value.id, "id???")}
                      {Object.keys(value).map((options) => {
                        if (options == "empAct") {
                          return (
                            <span className="header-options">
                              <div className="action-images">
                                <img
                                  src={DeleteLogo}
                                  alt="Delete Logo"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete(value.id);
                                  }}
                                />
                              </div>
                              <div
                                className="action-images"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onClick(value.id);
                                }}
                              >
                                <img
                                  src={EditLogo}
                                  alt="KeyValue Systems logo"
                                />
                              </div>
                            </span>
                          );
                        } else if (options == "address") {
                          {
                          }
                        } else {
                          return (
                            <span className={getColor(value[options])}>
                              {value[options]}
                            </span>
                          );
                        }
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
            {showDelete && (
              <>
                <Modal
                  buttonStyle={"white"}
                  onClose={() => {
                    onDelete();
                  }}
                  value={{ Del: "Delete", Cancel: "Cancel" }}
                  style={{
                    display: "flex",
                    position: "absolute",
                    zIndex: "1000",
                    left: "20%",
                    top: "40%",
                    width: "50%",
                    height: "50%",
                    backgroundColor: "rgba(255, 255, 255)",
                    color: "black",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: "40px",
                    textAlign: "center",
                    opacity: "1",
                    border: "1px black solid",
                    boxShadow: "0px 0px 20px 0px rgba(0,0,0,0.5)", // Example box shadow
                  }}
                ></Modal>
              </>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default EmployeeList;
