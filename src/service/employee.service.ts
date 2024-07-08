import Address from "../entity/address.entity";
import Employee from "../entity/employee.entity";
import httpException from "../exceptions/https.exceptions";
import EmployeeRepository from "../repository/employee.repository";
import { Role } from "../utils/role.enum";
import bcrypt from "bcrypt";
import jsonwebtoken, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET, JWT_VALIDITY } from "../utils/constants";
import Department from "../entity/department.entity";
import DepartmentRepository from "../repository/department.repository";
import DepartmentService from "./department.service";
import DepartmentRouter from "../routes/department.routes";
import DepartmentController from "../controller/department.controller";

export default class EmployeeService {
  constructor(
    private employeeRepository: EmployeeRepository,
    private departmentService: DepartmentService
  ) {}

  getAllEmployees = async () => {
    return this.employeeRepository.find();
  };

  getEmployeeById = async (id: number) => {
    console.log(id, "reaching get Employee id");
    return this.employeeRepository.findOneBy({ id });
  };

  createEmployee = async (
    email: string,
    name: string,
    age: number,
    line1: string,
    pincode: string,
    password: string,
    role: Role,
    department: string
  ) => {
    const newEmployee = new Employee();
    const address = new Address();
    const findDepartment = await this.departmentService.getDepartmentById({
      department_name: department,
    });
    console.log(findDepartment, "Have we got something here");
    if (!findDepartment) {
      throw new httpException(404, "No such Department Exist");
    }

    newEmployee.name = name;
    newEmployee.email = email;
    newEmployee.age = age;
    address.line1 = line1;
    address.pincode = pincode;
    newEmployee.address = address;
    newEmployee.password = password ? await bcrypt.hash(password, 10) : "";
    newEmployee.role = role;
    newEmployee.department = findDepartment;
    console.log(newEmployee);

    return this.employeeRepository.save(newEmployee);
  };

  deleteEmployee = async (employee: Partial<Employee>) => {
    console.log(employee);
    return this.employeeRepository.softRemove(employee);
  };

  async updateEmployee(
    employeeId?: number,
    email?: string,
    name?: string,
    age?: number,
    line1?: string,
    pincode?: string,
    password?: string,
    role?: Role,
    department_name?: string
  ) {
    // return this.employee
    console.log("updateEmployee entered");

    const newEmployee = await this.getEmployeeById(employeeId);

    const findDepartment = await this.departmentService.getDepartmentById({
      department_name: department_name,
    });
    console.log(findDepartment, "Have we got something here");
    if (!findDepartment) {
      throw new httpException(404, "No such Department Exist");
    }
    newEmployee.name = name ? name : newEmployee.name;
    newEmployee.email = email ? email : newEmployee.email;
    newEmployee.age = age ? age : newEmployee.age;
    newEmployee.password = password
      ? await bcrypt.hash(password, 10)
      : newEmployee.password;
    newEmployee.role = role ? role : newEmployee.role;
    newEmployee.address.line1 = line1 ? line1 : newEmployee.address.line1;
    newEmployee.address.pincode = pincode
      ? pincode
      : newEmployee.address.pincode;
    newEmployee.department = findDepartment
      ? findDepartment
      : newEmployee.department;
    console.log(newEmployee, "update end");
    return this.employeeRepository.update(employeeId, newEmployee);
  }

  loginEmployee = async (email: string, password: string) => {
    console.log(email);
    const employee = await this.employeeRepository.findOneBy({ email });

    if (!employee) {
      throw new httpException(500, "Employee Doesn't Exist");
    }

    const result = await bcrypt.compare(password, employee.password);

    if (!result) {
      throw new httpException(500, "Credentials Don't Match");
    }

    const payload: JwtPayload = {
      name: employee.name,
      email: employee.email,
      role: employee.role,
    };

    const token = jsonwebtoken.sign(payload, JWT_SECRET, {
      expiresIn: JWT_VALIDITY,
    });

    return { token };
  };
}
