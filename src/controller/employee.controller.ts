import Employee from "../entity/employee.entity";

import express from "express";
import EmployeeService from "../service/employee.service";
import httpException from "../exceptions/https.exceptions";
import { plainToInstance } from "class-transformer";
import { CreateEmployeeDto } from "../dto/employee.dto";
import { validate } from "class-validator";
import Address from "../entity/address.entity";
import { Role } from "../utils/role.enum";
import authorize from "../middleware/authorize.middleware";
import { AddressDto } from "../dto/address.dto";

export default class EmployeeController {
  public router: express.Router;

  constructor(private employeeService: EmployeeService) {
    this.router = express.Router();

    this.router.get("/", this.getAllEmployees);
    this.router.get("/:id", this.getEmployeesById);

    this.router.post("/", this.createEmployees);

    this.router.put("/:id", this.updateEmployees);

    this.router.delete("/:id", this.deleteEmployee);

    this.router.post("/login", this.loginEmployee);

    this.router.post("/", authorize, this.createEmployees);
  }

  public getAllEmployees = async (
    req: express.Request,
    res: express.Response
  ) => {
    const employee = await this.employeeService.getAllEmployees();
    res.status(200).send(employee);
  };

  public getEmployeesById = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const employeeId = Number(req.params.id);
      const employee = await this.employeeService.getEmployeeById(employeeId);
      if (!employee) {
        throw new httpException(404, "Error time");
      }
      res.status(200).send(employee);
    } catch (error) {
      console.log("hey you reached an error");
      next(error);
    }
  };

  public createEmployees = async (
    req: express.Request,
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

      // const role = req.body.role;
      // if (role !== Role.HR) {
      //   throw new httpException(
      //     403,
      //     "You are not authorized to create employee"
      //   );
      // }

      const createEmployeeDto = plainToInstance(CreateEmployeeDto, req.body);
      const errors = await validate(createEmployeeDto);
      if (errors.length > 0) {
        console.log(JSON.stringify(errors));
        throw new httpException(400, JSON.stringify(errors));
      }

      const line1 = req.body.address.line1;
      const pincode = req.body.address.pincode;
      // console.log(address, "ba");
      console.log(createEmployeeDto);

      const savedEmployee = await this.employeeService.createEmployee(
        createEmployeeDto.email,
        createEmployeeDto.name,
        createEmployeeDto.age,
        line1,
        pincode,
        createEmployeeDto.password,
        createEmployeeDto.role
      );
      res.status(201).send(savedEmployee);
    } catch (error) {
      next(error);
    }
  };

  public updateEmployees = async (
    req: express.Request,
    res: express.Response
  ) => {
    const body = req.body;
    const employeeId = Number(req.params.id);
    const newEmployee = await this.employeeService.getEmployeeById(employeeId);

    newEmployee.id = employeeId;
    newEmployee.name = body.name;
    newEmployee.email = body.email;
    newEmployee.age = body.age;

    // newEmployee.address = body.address; Wrang
    newEmployee.address.line1 = body.address.line1;
    newEmployee.address.pincode = body.address.pincode;

    console.log(newEmployee);
    const employee = await this.employeeService.updateEmployee(
      newEmployee,
      employeeId
    );
    res.status(200).send(employee);
  };

  public deleteEmployee = async (
    req: express.Request,
    res: express.Response
  ) => {
    const employee = await this.employeeService.deleteEmployee(
      Number(req.params.id)
    );
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
