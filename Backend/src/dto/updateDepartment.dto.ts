import {
  IsEmail,
  IsOptional,
  IsNumber,
  IsString,
  isEmail,
} from "class-validator";

export class UpdateDepartmentDto {
  @IsOptional()
  @IsString()
  department_name: string;

  @IsOptional()
  @IsString()
  desc: string;
}
