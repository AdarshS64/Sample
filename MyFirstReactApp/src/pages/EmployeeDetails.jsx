import { useParams } from "react-router-dom";
import EmpDetails from "../assets/constants";

const EmployeeDetails = () => {
  const { id } = useParams();

  const empDetails = EmpDetails.details;
  const empHeaders = EmpDetails.headers;

  console.log(empDetails);
  const empdetail = empDetails.filter((emp) => emp.empID == id);

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
          {Object.keys(empdetail).map((value) => {
            {
              return Object.keys(empdetail[value]).map((val) => {
                if (empdetail[value][val] != "Action") {
                  return (
                    <div className="detail-block">
                      <span className="employee-details-header">
                        {empHeaders[val]}
                      </span>
                      <span className={onStat(empdetail[value][val])}>
                        {empdetail[value][val]}
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
