import { DataSource } from "typeorm";
import EmployeeController from "../controller/employee.controller";
import EmployeeRepository from "../repository/employee.repository";
import EmployeeService from "../service/employee.service";
import Employee from "../entity/employee.entity";
import datasource from "../db/data-source.db";
import DepartmentService from "../service/department.service";
import DepartmentRepository from "../repository/department.repository";
import Department from "../entity/department.entity";
import DepartmentController from "../controller/department.controller";

console.log("Department Routes");
const departmentController= new DepartmentController(
  new DepartmentService(
    new DepartmentRepository(datasource.getRepository(Department))
  )
);
const DepartmentRouter = departmentController.router;

export default DepartmentRouter;
