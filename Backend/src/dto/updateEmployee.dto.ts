import { Type } from "class-transformer";
import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { AddressDto } from "./address.dto";
import "reflect-metadata";
import { Role } from "../utils/role.enum";
import { CreateEmployeeDto } from "./employee.dto";

export class UpdateEmployeeDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsEmail()
  @IsString()
  @IsOptional()
  email: string;

  @IsNumber()
  @IsOptional()
  age: number;

  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  @IsOptional()
  address: any;

  @IsString()
  @IsOptional()
  password: string;

  @IsEnum(Role)
  @IsOptional()
  role: Role;

  @IsString()
  @IsOptional()
  department: string;
}
