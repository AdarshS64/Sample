import { getRepository } from "typeorm";
import EmployeeRepository from "../../src/repository/employee.repository";
import Employee from "../../src/entity/employee.entity";
import EmployeeService from "../../src/service/employee.service";
import { when } from "jest-when";
import Department from "../../src/entity/department.entity";
import DepartmentRepository from "../../src/repository/department.repository";
import DepartmentService from "../../src/service/department.service";

describe("Employee Service", () => {
  let departmentRepository: DepartmentRepository;
  let employeeService: EmployeeService;
  let departmentService: DepartmentService;
  let employeeRepository: EmployeeRepository;

  beforeAll(() => {
    const dataSource = {
      getRepository: jest.fn(),
    };
    departmentRepository = new DepartmentRepository(
      dataSource.getRepository(Department)
    ) as jest.Mocked<DepartmentRepository>;

    employeeRepository = new EmployeeRepository(
      dataSource.getRepository(Employee)
    ) as jest.Mocked<EmployeeRepository>;

    employeeService = new EmployeeService(
      employeeRepository,
      departmentService
    );

    departmentService = new DepartmentService(departmentRepository);
  });

  it("should return allEmployees", async () => {
    const mock = jest.fn(departmentRepository.find).mockResolvedValue([]);
    departmentRepository.find = mock;

    const users = await departmentService.getAllDepartment();

    expect(users).toEqual([]);
    expect(mock).toHaveBeenCalledTimes(1);
  });

  it("should return EmployeesById", async () => {
    const mock = jest.fn();
    when(mock)
      .calledWith({ id: 1 })
      .mockResolvedValue({ id: 1, name: "sampl" } as Employee);
    employeeRepository.findOneBy = mock;

    const users = await employeeService.getEmployeeById(1);

    expect(users.name).toEqual("sample");
    expect(mock).toHaveBeenCalledTimes(1);
  });

  it("should createEmployees", async () => {
    const newEmployeeData = {
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Engineer",
      department: "IT",
      age: 30,
      password: "123",
      address: {
        line1: "car",
        pincode: "123456",
      },
    };

    const mock = jest.fn();
    when(mock)
      .calledWith({ id: 1 })
      .mockResolvedValue({ id: 1, ...newEmployeeData });
    employeeRepository.save = mock;

    const mockDepartment = jest
      .fn(departmentService.getDepartmentById)
      .mockResolvedValue({
        department_name: "Account",
        description: "car",
      } as Department);

    const createdEmployee = await employeeService.createEmployee(
      newEmployeeData.email,
      newEmployeeData.name,
      newEmployeeData.age,
      newEmployeeData.address.line1,
      newEmployeeData.address.pincode,
      newEmployeeData.password,
      newEmployeeData.role,
      newEmployeeData.department
    );

    expect(createdEmployee).toBeDefined(); // Ensure something is returned
    expect(createdEmployee.id).toEqual(1);
    expect(mock).toHaveBeenCalledTimes(1);
  });
});
