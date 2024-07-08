import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  isEmail,
} from "class-validator";

export class DepartmentDto {
  @IsNotEmpty()
  @IsString()
  department_name: string;

  @IsNotEmpty()
  @IsString()
  desc: string;
}
