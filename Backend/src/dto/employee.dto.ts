import { Type } from "class-transformer";
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from "class-validator";
import { AddressDto } from "./address.dto";
import "reflect-metadata";
import { Role } from "../utils/role.enum";
import { Status } from "../utils/status.enum";

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  experience: string;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  address: any;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;

  @IsNotEmpty()
  @IsString()
  department: string;

  @IsNotEmpty()
  @IsEnum(Status)
  status: Status;
}
