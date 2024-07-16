import TextField from "../components/TextField";
import SelectField from "../components/SelectField";
import Button from "../components/Button";

const EmployeeForm = (props) => {
  const { mode = "create" } = props;
  const roles = ["HR", "DEV", "IT"];
  const status = ["Probation", "Active", "Inactive"];
  const dept = ["UI/UX", "Frontend", "Backend"];
  const details = props.details;

  const onChange = (e, field) => {
    console.log(e.target.value, field);

    if (props.onChange) {
      console.log(e.target.value, field);
      props.onChange(e, field);
    }
  };

  const fields = [
    {
      label: "Employee name",
      placeholder: "",
      select: false,
      key: "name",
      onChange: onChange,
      visible: true,
    },

    {
      label: "Joining Date",
      placeholder: "",
      select: false,
      key: "empJd",
      onChange: onChange,
      visible: true,
    },
    {
      label: "Department",
      placeholder: "",
      select: true,
      options: dept,
      key: "empDep",
      onChange: onChange,
      visible: true,
    },
    {
      label: "Role",
      placeholder: "",
      select: true,
      options: roles,
      key: "role",
      onChange: onChange,
      visible: true,
    },
    {
      label: "Status",
      placeholder: "",
      select: true,
      key: "empStat",
      options: status,
      onChange: onChange,
      visible: true,
    },
    {
      label: "Experience",
      placeholder: "",
      select: false,
      key: "empExp",
      onChange: onChange,
      visible: true,
    },
    {
      label: "Address",
      placeholder: "",
      select: false,
      key: "address",
      onChange: onChange,
      visible: true,
    },
    {
      label: "Employee ID",
      placeholder: "",
      select: false,
      key: "id",
      onChange: onChange,
      visible: mode == "edit" ? false : true,
    },
  ];

  return (
    <>
      <form className="employee-form">
        <div className="inputs">
          {fields.map((value) => {
            if (!value.select) {
              console.log(value.label);
              if (value.label == "Employee ID") {
                if (!value.visible) {
                  return (
                    <span className="input-box">
                      <TextField
                        id={value.key}
                        label={value.label}
                        placeholder={value.visible ? value.label : props.userId}
                        onChange={value.onChange}
                        visible={value.visible}
                        style={
                          !value.visible ? { backgroundColor: "#949494" } : {}
                        }
                      />
                    </span>
                  );
                }
              } else {
                return (
                  <span className="input-box">
                    <TextField
                      id={value.key}
                      label={value.label}
                      placeholder={value.visible ? value.label : props.userId}
                      onChange={value.onChange}
                    />
                  </span>
                );
              }
            } else {
              return (
                <span className="input-box">
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
            <input type="button" value="Cancel" /> */}
        <Button
          value="Submit"
          className="employee-button"
          handleSub={props.onSubmit}
        ></Button>
        <Button
          value="Cancel"
          className="employee-button"
          handleSub={props.onCancel}
        ></Button>
      </form>
      {fields.map((box) => {
        return (
          <div>
            <span>
              {box.label} : {details[box.key]}
            </span>
            {/* Render other properties similarly */}
          </div>
        );
      })}
    </>
  );
};

export default EmployeeForm;
