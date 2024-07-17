import Employee from "../entity/employee.entity";

import express, { NextFunction } from "express";
import EmployeeService from "../service/employee.service";
import httpException from "../exceptions/https.exceptions";
import { plainToInstance } from "class-transformer";
import { CreateEmployeeDto } from "../dto/employee.dto";
import { validate } from "class-validator";
import Address from "../entity/address.entity";
import { Role } from "../utils/role.enum";
import authorize from "../middleware/authorize.middleware";
import { AddressDto } from "../dto/address.dto";
import DepartmentService from "../service/department.service";
import DepartmentController from "./department.controller";
import departmentService from "../service/department.service";
import { UpdateEmployeeDto } from "../dto/updateEmployee.dto";
import RequestWithUser from "../utils/requestwithUser";
import { EmployeeResponseDto } from "../dto/employee.response.dto";
import { Status } from "../utils/status.enum";

export default class EmployeeController {
  public router: express.Router;

  constructor(private employeeService: EmployeeService) {
    this.router = express.Router();

    this.router.get("/", authorize, this.getAllEmployees);
    this.router.get("/:id", authorize, this.getEmployeesById);

    this.router.post("/", authorize, this.createEmployees);

    this.router.patch("/:id", authorize, this.updateEmployees);

    this.router.delete("/:id", authorize, this.deleteEmployee);

    this.router.post("/login", this.loginEmployee);

    this.router.post("/", authorize, this.createEmployees);
  }

  public getAllEmployees = async (
    req: RequestWithUser,
    res: express.Response,
    next: NextFunction
  ) => {
    try {
      const employee = await this.employeeService.getAllEmployees();
      const getEmployeeDto = plainToInstance(EmployeeResponseDto, employee);
      const errors = await validate(EmployeeResponseDto);
      if (errors.length > 0) {
        console.log(JSON.stringify(errors));
        throw new httpException(400, JSON.stringify(errors));
      }
      res.status(200).send(getEmployeeDto);
    } catch (error) {
      console.log("hey you reached an error");
      next(error);
    }
  };

  public getEmployeesById = async (
    req: RequestWithUser,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const employeeId = Number(req.params.id);
      const employee = await this.employeeService.getEmployeeById(employeeId);
      if (!employee) {
        throw new httpException(404, "Employee not found");
      }
      const getEmployeeDto = plainToInstance(EmployeeResponseDto, employee);
      const errors = await validate(EmployeeResponseDto);
      if (errors.length > 0) {
        console.log(JSON.stringify(errors));
        throw new httpException(400, JSON.stringify(errors));
      }
      res.status(200).send(getEmployeeDto);
    } catch (error) {
      console.log("hey you reached an error");
      next(error);
    }
  };

  public createEmployees = async (
    req: RequestWithUser,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      //   const employeeDto = plainToInstance(CreateEmployeeDto, req.body);
      //   const errors = await validate(employeeDto);
      //   if (errors.length) {
      //     console.log(JSON.stringify(errors));
      //     throw new httpException(400, JSON.stringify(errors));
      //   }

      //   const body = req.body;

      //   const name = body.name;
      //   const email = body.email;
      //   const age = body.age;
      //   const address = new Address();
      //   address.line1 = body.address.line1;
      //   address.pincode = body.address.pincode;
      //   const password = body.password;
      //   const role = body.role;
      //   console.log(role);

      //   const employee = await this.employeeService.createEmployee(
      //     name,
      //     email,
      //     age,
      //     address,
      //     password,
      //     role
      //   );
      //   res.status(200).send(employee);
      // } catch (error) {
      //   next(error);
      // }

      const role = req.role;
      if (role !== Role.HR) {
        throw new httpException(
          403,
          "You are not authorized to create employee"
        );
      }

      const createEmployeeDto = plainToInstance(CreateEmployeeDto, req.body);
      const errors = await validate(createEmployeeDto);
      if (errors.length > 0) {
        console.log(errors, "yoooo");
        console.log(errors[0].property, "chop");
        throw new httpException(
          400,
          JSON.stringify(
            errors[0].property + " : " + errors[0].constraints.isString
          )
        );
      }

      const line1 = req.body.address.line1;
      const pincode = req.body.address.pincode;
      const department = req.body.department;

      // console.log(address, "ba");
      console.log(createEmployeeDto);

      const savedEmployee = await this.employeeService.createEmployee(
        createEmployeeDto.email,
        createEmployeeDto.name,
        createEmployeeDto.experience,
        line1,
        pincode,
        createEmployeeDto.password,
        Role[createEmployeeDto.role],
        department,
        Status[createEmployeeDto.status]
      );
      res.status(201).send(savedEmployee);
    } catch (error) {
      next(error);
    }
  };

  public updateEmployees = async (
    req: RequestWithUser,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const role = req.role;
      if (role !== Role.HR) {
        throw new httpException(
          403,
          "You are not authorized to create employee"
        );
      }
      const body = req.body;
      const employeeId = Number(req.params.id);
      const updateEmployeeDto = plainToInstance(UpdateEmployeeDto, req.body);
      console.log(updateEmployeeDto);
      const errors = await validate(updateEmployeeDto);
      if (errors.length > 0) {
        console.log(JSON.stringify(errors));
        throw new httpException(
          400,
          JSON.stringify(
            errors[0].property + " : " + errors[0].constraints.isString
          )
        );
      }

      const employee = await this.employeeService.updateEmployee(
        employeeId,
        updateEmployeeDto.email,
        updateEmployeeDto.name,
        updateEmployeeDto.experience,
        req.body.line1,
        req.body.pincode,
        updateEmployeeDto.password,
        updateEmployeeDto.role,
        req.body.department_name,
        updateEmployeeDto.status
      );
      res.status(200).send(employee);
    } catch (error) {
      next(error);
    }
  };

  public deleteEmployee = async (
    req: RequestWithUser,
    res: express.Response
  ) => {
    const role = req.role;
    if (role !== Role.HR) {
      throw new httpException(403, "You are not authorized to create employee");
    }
    const employee = await this.employeeService.getEmployeeById(
      Number(req.params.id)
    );
    console.log(employee, "car");
    const deleteEmployee = await this.employeeService.deleteEmployee(employee);
    res.status(200).send("Deleted");
  };

  public loginEmployee = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const { email, password } = req.body;
    try {
      const token = await this.employeeService.loginEmployee(email, password);
      res.status(200).send({ data: token });
    } catch (error) {
      next(error);
    }
  };
}
