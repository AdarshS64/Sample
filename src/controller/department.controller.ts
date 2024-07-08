import express, { NextFunction } from "express";
import EmployeeService from "../service/employee.service";
import httpException from "../exceptions/https.exceptions";
import { plainToInstance } from "class-transformer";
import { CreateEmployeeDto } from "../dto/employee.dto";
import { validate } from "class-validator";
import authorize from "../middleware/authorize.middleware";
import DepartmentService from "../service/department.service";
import { DepartmentDto } from "../dto/department.dto";
import Employee from "../entity/employee.entity";

export default class DepartmentController {
  public router: express.Router;

  constructor(private departmentService: DepartmentService) {
    this.router = express.Router();

    this.router.get("/", this.getAllDepartments);
    this.router.get("/:id", this.getDepartmentsById);

    this.router.post("/", this.createDepartments);

    this.router.put("/:id", this.updateDepartments);

    this.router.delete("/:id", this.deleteDepartment);

    this.router.post("/", authorize, this.createDepartments);
  }

  public getAllDepartments = async (
    req: express.Request,
    res: express.Response
  ) => {
    const employee = await this.departmentService.getAllDepartment();
    res.status(200).send(employee);
  };

  public getDepartmentsById = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const departmentId = Number(req.params.id);
      const department = await this.departmentService.getDepartmentById({
        id: departmentId,
      });
      if (!department) {
        throw new httpException(404, "Department not found");
      }
      res.status(200).send(department);
    } catch (error) {
      console.log("hey you reached an error");
      next(error);
    }
  };

  public createDepartments = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const createDepartmentDto = plainToInstance(DepartmentDto, req.body);
      const errors = await validate(createDepartmentDto);
      if (errors.length > 0) {
        console.log(JSON.stringify(errors));
        throw new httpException(400, JSON.stringify(errors));
      }

      // console.log(address, "ba");
      console.log(createDepartmentDto);

      const savedEmployee = await this.departmentService.createDepartment(
        createDepartmentDto.department_name,
        createDepartmentDto.desc
      );
      res.status(201).send(savedEmployee);
    } catch (error) {
      next(error);
    }
  };

  public updateDepartments = async (
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) => {
    try {
      const body = req.body;
      const departmentId = Number(req.params.id);
      const department_name = body.department_name?.toUpperCase();
      const description = body.description;

      const check = await this.departmentService.getDepartmentById({
        department_name: department_name,
      });

      if (!check.id || check.id == departmentId) {
        const employee = await this.departmentService.updateDepartment(
          department_name,
          description,
          departmentId
        );
        res.status(200).send(employee);
      } else {
        throw new httpException(403, "Department with same name exists");
      }
    } catch (error) {
      next(error);
    }
  };

  public deleteDepartment = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const department = await this.departmentService.getDepartmentEmployees({
        id: Number(req.params.id),
      });
      console.log(department, department.employee, "car");
      if (Object.keys(department.employee).length === 0) {
        await this.departmentService.deleteDepartment(department);
        res.status(200).send("Deleted");
      } else {
        throw new httpException(
          401,
          "Employees are present in this department"
        );
      }
    } catch (error) {
      next(error);
    }
  };
}
