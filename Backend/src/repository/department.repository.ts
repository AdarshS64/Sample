import { Repository } from "typeorm";
import Employee from "../entity/employee.entity";
import Department from "../entity/department.entity";

export default class DepartmentRepository {
  constructor(private repository: Repository<Department>) {
    this.repository = repository;
  }

  async find(): Promise<Department[]> {
    return this.repository.find({});
  }

  async findOneBy(
    filter: Partial<Department>,
    relations?
  ): Promise<Department | null> {
    const departmentRepository = this.repository;
    console.log(filter, relations, "u reached find one by");
    return departmentRepository.findOne({
      where: filter,
      relations: relations?.relations,
    });
  }

  async save(employee: Partial<Department>): Promise<Department> {
    const departmentRepository = this.repository;
    console.log(employee, "yay save employee");
    return departmentRepository.save(employee);
  }

  async delete(id: number): Promise<void> {
    const departmentRepository = this.repository;
    console.log("yeah it reaches here");
    await departmentRepository.softDelete(id);
  }

  async update(id: number, filter: Partial<Department>): Promise<void> {
    const departmentRepository = this.repository;
    await departmentRepository.update(id, filter);
  }

  async softRemove(filter: Partial<Department>): Promise<void> {
    const departmentRepository = this.repository;
    await departmentRepository.softRemove(filter);
  }
}
