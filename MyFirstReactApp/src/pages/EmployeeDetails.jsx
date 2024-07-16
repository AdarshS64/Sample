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
      setEmpDetails(employees);
    }
  }, [data, isSuccess]);

  const empHeaders = EmpDetails.headers;

  const onStat = (type) => {
    if (type == "Probation") {
      return "header-probation";
    } else if (type == "Inactive") {
      return "header-inactive";
    } else if (type == "Active") {
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
              return Object.keys(empDetails[value]).map((val) => {
                if (empDetails[value][val] != "Action") {
                  return (
                    <div className="detail-block">
                      <span className="employee-details-header">
                        {empHeaders[val]}
                      </span>
                      <span className={onStat(empDetails[value][val])}>
                        {empDetails[value][val]}
                      </span>
                    </div>
                  );
                }
              });
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
