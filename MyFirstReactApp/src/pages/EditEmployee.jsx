import "./style.scss";
import { useState, useEffect } from "react";
import EmployeeForm from "../components/EmployeeForm";
import { useParams } from "react-router-dom";

const EditEmployee = () => {
  const { id } = useParams();
  const [eddetails, setEdDetails] = useState({
    name: "",
    id: "",
    empJd: "",
    role: "",
    empStat: "",
    empExp: "",
    address: "",
  });

  const onChange = (e, field) => {
    console.log(field, e.target.value);
    setEdDetails({ ...eddetails, [field]: e.target.value });
  };

  return (
    <div className="whole">
      <main>
        <div className="content">
          <div className="heading">
            <h2>Edit Employee</h2>
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
            details={eddetails}
            mode="edit"
            userId={id}

          ></EmployeeForm>
        </div>
      </main>
    </div>
  );
};
export default EditEmployee;
