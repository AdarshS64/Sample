import "./style.scss";
import { useState, useEffect } from "react";
import EmployeeForm from "../components/EmployeeForm";
import { actionTypes } from "../store/reducer";
import { useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addEmployee } from "../store/employeeReducer";
import { useAddEmployeeListMutation } from "../api/EmployeeApi/api";

const CreateEmployee = () => {
  const [crdetails, setcCrdetails] = useState({
    name: "",
    id: "5",
    empJd: "",
    empDep: "",
    role: "",
    empStat: "",
    empExp: "",
    address: "",
    email: "",
  });
  const dispatch = useDispatch();
  const [employee, { isSuccess, data }] = useAddEmployeeListMutation();

  // const { state, dispatch } = useOutletContext();

  const onChange = (e, field) => {
    console.log(field, e.target.value, "Create Employee OnChange");
    setcCrdetails({ ...crdetails, [field]: e.target.value });
  };

  const onSubmit = (crdetails, e) => {
    e.preventDefault();

    // dispatch({
    //   type: actionTypes.ADD_EMPLOYEES,
    //   payload: crdetails[0],
    // });
    // console.log(crdetails);
    // dispatch(addEmployee(crdetails[0]));
    console.log(crdetails[0].empDep, "onSubmit");
    employee({
      email: crdetails[0].email,
      name: crdetails[0].name,
      age: 10,
      address: { line1: crdetails[0].address, pincode: "123" },
      password: "1234",
      role: crdetails[0].role,
      department: crdetails[0].empDep,
    });
  };

  const onCancel = (e) => {
    e.stopPropogation();
    setcCrdetails({
      name: "",
      id: "",
      empJd: "",
      role: "",
      empStat: "",
      empExp: "",
      address: "",
      empDep: "",
    });
  };

  console.log(crdetails);

  return (
    <main>
      <div className="content">
        <div className="heading">
          <h2>Create Employee</h2>
        </div>
        {/* <form className="employee-form" action="/action_page.php">
            <div className="inputs">
              {Boxes.map((value) => {
                if (!value.select) {
                  console.log(value.label);
                  return (
                    <span style={{ margin: "12px" }}>
                      <TextField
                        id={value.key}
                        label={value.label}
                        placeholder={value.label}
                        onChange={value.onChange}
                      />
                    </span>
                  );
                } else {
                  return (
                    <span style={{ margin: "12px", alignItems: "self-start" }}>
                      <SelectField
                        label={value.label}
                        name={value.label}
                        options={value.options}
                        onChange={value.onChange}
                        id={value.key}
                      ></SelectField>
                    </span>
                  );
                }
              })}
            </div>
            <br />
            {/* <input type="submit" value="Create" id="sub" />
            <input type="button" value="Cancel" /> 
            <Button value="Submit" className="employee-button"></Button>
            <Button value="Cancel" className="employee-button"></Button>
          </form> */}
        <EmployeeForm
          onChange={onChange}
          details={crdetails}
          visibleid={false}
          onSubmit={onSubmit.bind(this, [crdetails])} //bind method
          onCancel={onCancel}
        ></EmployeeForm>
      </div>
    </main>
  );
};
export default CreateEmployee;
