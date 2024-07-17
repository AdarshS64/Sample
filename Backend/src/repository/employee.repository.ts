import { Repository } from "typeorm";
import Employee from "../entity/employee.entity";
import Address from "../entity/address.entity";
import { join } from "path";

export default class EmployeeRepository {
  constructor(private repository: Repository<Employee>) {
    this.repository = repository;
  }

  async find(): Promise<Employee[]> {
    return this.repository.find({
      relations: ["address", "department"],
    });
  }

  async findOneBy(filter: Partial<Employee>): Promise<Employee | null> {
    const employeeRepository = this.repository;
    console.log(filter, "u reached find one by");
    return employeeRepository.findOne({
      where: filter,
      relations: ["address", "department"],
    });
  }

  async save(employee: Partial<Employee>): Promise<Employee> {
    const employeeRepository = this.repository;
    console.log(employee, "yay save employee");
    return employeeRepository.save(employee);
  }

  async delete(id: number): Promise<void> {
    const employeeRepository = this.repository;
    console.log("yeah it reaches here");
    await employeeRepository.softDelete(id);
  }

  async update(id: number, filter: Partial<Employee>): Promise<Employee> {
    const employeeRepository = this.repository;

    return await employeeRepository.save(filter);
  }

  async softRemove(filter: Partial<Employee>): Promise<void> {
    const employeeRepository = this.repository;
    await employeeRepository.softRemove(filter);
  }
}
