import Address from "../entity/address.entity";
import Employee from "../entity/employee.entity";
import httpException from "../exceptions/https.exceptions";
import DepartmentRepository from "../repository/department.repository";
import { Role } from "../utils/role.enum";
import bcrypt from "bcrypt";
import jsonwebtoken, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET, JWT_VALIDITY } from "../utils/constants";
import Department from "../entity/department.entity";
import EmployeeRepository from "../repository/employee.repository";
import EmployeeService from "./employee.service";

export default class DepartmentService {
  constructor(private DepartmentRepository: DepartmentRepository) {}

  getAllDepartment = async () => {
    return this.DepartmentRepository.find();
  };

  getDepartmentById = async (department: Partial<Department>) => {
    console.log(department.id, "reaching get Employee id");
    return this.DepartmentRepository.findOneBy(department, {});
  };

  getDepartmentEmployees = async (department: Partial<Department>) => {
    console.log("reaching get Employee ");

    return this.DepartmentRepository.findOneBy(department, {
      relations: ["employee"],
    });
  };

  createDepartment = async (department: string, description: string) => {
    const newDept = new Department();
    department = department.toUpperCase();
    newDept.department_name = department;
    newDept.description = description;

    console.log(newDept);

    return this.DepartmentRepository.save(newDept);
  };

  deleteDepartment = async (department: Partial<Department>) => {
    console.log(department);
    return this.DepartmentRepository.softRemove(department);
  };

  async updateDepartment(
    department_name: string,
    description: string,
    id?: number
  ) {
    // return this.employee

    const newDepartment = await this.DepartmentRepository.findOneBy({
      id: id,
    });

    newDepartment.department_name = department_name;
    newDepartment.description = description;

    console.log("updept");

    return this.DepartmentRepository.update(id, newDepartment);
  }
}
