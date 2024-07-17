import { useParams } from "react-router-dom";
import EmpDetails from "../assets/constants";
import { useGetEmployeeDetailsQuery } from "../api/EmployeeApi/api";
import { useState, useEffect } from "react";

const EmployeeDetails = () => {
  const { id } = useParams();

  const [empDetails, setEmpDetails] = useState([]);

  const { data, isSuccess } = useGetEmployeeDetailsQuery(id);
  console.log(data);
  useEffect(() => {
    if (isSuccess) {
      const employees = {
        ...data,

        joiningDate: new Date(data.createdAt).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
      };
      setEmpDetails({ ...employees, address: employees.address?.line1 });
    }
  }, [data, isSuccess]);

  console.log(empDetails);

  const empHeaders = EmpDetails.headers;

  const onStat = (type) => {
    if (type == "PROBATION") {
      return "header-probation";
    } else if (type == "INACTIVE") {
      return "header-inactive";
    } else if (type == "ACTIVE") {
      return "header-active";
    }
    return "employee-details-header";
  };

  return (
    <main>
      <div className="content">
        <div className="heading">
          <h2>Employee Details</h2>
        </div>
        <div className="employee-details">
          {Object.keys(empDetails).map((value) => {
            {
              console.log(value);
              console.log(empDetails[value]);
              if (empDetails[value]) {
                if (empDetails[value] != "Action" && empHeaders[value]) {
                  return (
                    <div className="detail-block">
                      <span className="employee-details-header">
                        {empHeaders[value]}
                      </span>
                      <span className={onStat(empDetails[value])}>
                        {empDetails[value]}
                      </span>
                    </div>
                  );
                }
              }
            }
          })}
        </div>
      </div>
    </main>
  );
};
export default EmployeeDetails;

// <>
//
// <br />
// <span className="employee-details-header">
//   {value[options]}
// </span>
// </>
