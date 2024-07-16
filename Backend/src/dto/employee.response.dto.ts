import { Exclude } from "class-transformer";
import { CreateEmployeeDto } from "./employee.dto";

export class EmployeeResponseDto extends CreateEmployeeDto {
  @Exclude()
  password: string;
}
