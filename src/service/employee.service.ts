import Address from "../entity/address.entity";
import Employee from "../entity/employee.entity";
import httpException from "../exceptions/https.exceptions";
import EmployeeRepository from "../repository/employee.repository";
import { Role } from "../utils/role.enum";
import bcrypt from "bcrypt";
import jsonwebtoken, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET, JWT_VALIDITY } from "../utils/constants";

export default class EmployeeService {
  constructor(private employeeRepository: EmployeeRepository) {}

  getAllEmployees = async () => {
    return this.employeeRepository.find();
  };

  getEmployeeById = async (id: number) => {
    return this.employeeRepository.findOneBy({ id });
  };

  createEmployee = async (
    email: string,
    name: string,
    age: number,
    line1: string,
    pincode: string,
    password: string,
    role: Role
  ) => {
    const newEmployee = new Employee();
    const address = new Address();

    newEmployee.name = name;
    newEmployee.email = email;
    newEmployee.age = age;
    address.line1 = line1;
    address.pincode = pincode;
    newEmployee.address = address;
    newEmployee.password = password ? await bcrypt.hash(password, 10) : "";
    newEmployee.role = role;
    console.log(newEmployee);

    return this.employeeRepository.save(newEmployee);
  };

  deleteEmployee = async (id: number) => {
    return this.employeeRepository.delete(id);
  };

  async updateEmployee(employee: Partial<Employee>, id?: number) {
    // return this.employee
    return this.employeeRepository.update(id, employee);
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
