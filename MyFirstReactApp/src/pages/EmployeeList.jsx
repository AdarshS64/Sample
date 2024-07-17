import { useOutlet, useOutletContext, useParams } from "react-router-dom";
import DeleteLogo from "../assets/delete.svg";
import EditLogo from "../assets/edit.svg";
import SelectField from "../components/SelectField";
import { useNavigate } from "react-router-dom";
import EmpDetails from "../assets/constants";
import Modal from "../components/Modal";
import { useEffect, useState } from "react";
import { actionTypes } from "../store/reducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { filterEmployee, deleteEmployee } from "../store/employeeReducer";
import {
  useDeleteEmployeeListMutation,
  useGetEmployeeListQuery,
} from "../api/EmployeeApi/api";

const EmployeeList = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [showDelete, setShowDelete] = useState(false);
  const [empId, setEmpId] = useState(0);
  const dispatch = useDispatch();
  const [empDetails, setEmpDetails] = useState([]);

  // const { state } = useOutletContext();

  // console.log(...state.employees, "eL");

  // const status = state.status;
  const [deleteEmp] = useDeleteEmployeeListMutation();

  const { data, isSuccess } = useGetEmployeeListQuery();
  useEffect(() => {
    if (isSuccess) {
      const employees = data.map((emp) => ({
        ...emp,
        joiningDate: new Date(emp.createdAt).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
      }));
      setEmpDetails(employees);
    }
  }, [data, isSuccess]);

  // const stat = useSelector((state) => {
  //   return state;
  // });

  // let empDetails = useSelector((state) => {
  //   return state.employee.employees;
  // });

  let status = useSelector((state) => {
    return state.employee.status;
  });

  // setEmpDetails(
  //   status === "All"
  //     ? empDetails
  //     : empDetails.filter((employee) => employee.empStat === status)
  // );

  const empHeaders = EmpDetails.headers;

  const getColor = (options) => {
    if (options == "PROBATION") {
      return "header-probation";
    } else if (options == "ACTIVE") {
      return "header-active";
    } else if (options == "INACTIVE") {
      return "header-inactive";
    }
    return "header-options";
  };

  const onClick = (id) => {
    navigate(`edit/${id}`);
  };

  const onCreate = (id) => {
    navigate("create");
  };

  const onSelect = (e, id) => {
    e.stopPropagation();
    navigate(`details/${id}`);
  };

  const onDelete = (id) => {
    // const action = {
    //   type: actionTypes.DELETE_EMPLOYEES,
    //   payload: id,
    // };
    setShowDelete(false);
    console.log("delete");
    deleteEmp({ id: id });
  };

  const onFilter = (e, action) => {
    // dispatch({
    //   type: actionTypes.FILTER_EMPLOYEES,
    //   payload: action,
    // });
    dispatch(filterEmployee(action));
  };

  console.log(empDetails);

  return (
    <>
      <div className="whole">
        <main>
          <div className="content">
            <div className="heading">
              <h2>Employee List</h2>
              <div className="employee-filter-section">
                <div className="filter-section">
                  <SelectField
                    label="Filter By"
                    name="Choose Filter"
                    onChange={onFilter}
                    options={["Active", "Inactive", "Probation", "All"]}
                  ></SelectField>
                </div>
                <div className="create-section" onClick={onCreate}>
                  <span className="create-employee-plus">+</span>
                  <span className="create-employee-text">Create Employee</span>
                </div>
              </div>
            </div>
            <div className="emp-data">
              <div className="data-heading">
                {Object.keys(empHeaders).map((options) => {
                  if (options != "address" && options != "email") {
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
                {console.log(empDetails)}{" "}
                {empDetails.map((value) => {
                  return (
                    <div
                      className="data-rows"
                      onClick={(e) => {
                        onSelect(e, value.id);
                      }}
                    >
                      {Object.keys(empHeaders).map((options) => {
                        console.log(options, "options");
                        if (
                          options == "address" ||
                          options == "empDep" ||
                          options == "email" ||
                          options == "empAct"
                        ) {
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
                      <span className="header-options">
                        <div className="action-images">
                          <img
                            src={DeleteLogo}
                            alt="Delete Logo"
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowDelete(!showDelete);
                              setEmpId(value.id);
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
                          <img src={EditLogo} alt="KeyValue Systems logo" />
                        </div>
                      </span>
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
                    setShowDelete(false);
                  }}
                  onSubmit={() => {
                    onDelete(empId);
                  }}
                  value={{ Del: "Delete", Cancel: "Cancel" }}
                  style={{
                    display: "flex",
                    position: "absolute",
                    zIndex: "1000",

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
