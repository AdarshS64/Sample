import { getRepository } from "typeorm";
import EmployeeRepository from "../../src/repository/employee.repository";
import Employee from "../../src/entity/employee.entity";
import EmployeeService from "../../src/service/employee.service";
import { when } from "jest-when";
import Department from "../../src/entity/department.entity";
import DepartmentRepository from "../../src/repository/department.repository";
import DepartmentService from "../../src/service/department.service";
import { Role } from "../../src/utils/role.enum";
import { Status } from "../../src/utils/status.enum";

describe("Employee Service", () => {
  let employeeRepository: EmployeeRepository;
  let employeeService: EmployeeService;
  let departmentService: DepartmentService;

  beforeAll(() => {
    const dataSource = {
      getRepository: jest.fn(),
    };
    employeeRepository = new EmployeeRepository(
      dataSource.getRepository(Employee)
    ) as jest.Mocked<EmployeeRepository>;

    departmentService = new DepartmentService(
      new DepartmentRepository(
        dataSource.getRepository(Department)
      ) as jest.Mocked<DepartmentRepository>
    );

    employeeService = new EmployeeService(
      employeeRepository,
      departmentService
    );
  });

  it("should return allEmployees", async () => {
    const mock = jest.fn(employeeRepository.find).mockResolvedValue([]);
    employeeRepository.find = mock;

    const users = await employeeService.getAllEmployees();

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
      role: "HR",
      department: "IT",
      experience: "30",
      password: "123",
      address: {
        line1: "car",
        pincode: "123456",
      },
      status: "PROBATION",
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
      newEmployeeData.experience,
      newEmployeeData.address.line1,
      newEmployeeData.address.pincode,
      newEmployeeData.password,
      Role[newEmployeeData.role],
      newEmployeeData.department,
      Status[newEmployeeData.status]
    );

    expect(createdEmployee).toBeDefined(); // Ensure something is returned
    expect(createdEmployee.id).toEqual(1);
    expect(mock).toHaveBeenCalledTimes(1);
  });
});
