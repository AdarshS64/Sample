import "./style.scss";
import { useState, useEffect } from "react";
import EmployeeForm from "../components/EmployeeForm";

const CreateEmployee = () => {
  const [crdetails, setcCrdetails] = useState({
    empName: "",
    empId: "",
    empJd: "",
    empRole: "",
    empStat: "",
    empExp: "",
    empAdd: "",
  });

  const onChange = (e, field) => {
    console.log(field, e.target.value);
    setcCrdetails({ ...crdetails, [field]: e.target.value });
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
        ></EmployeeForm>
      </div>
    </main>
  );
};
export default CreateEmployee;
