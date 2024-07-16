import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  isEmail,
} from "class-validator";

export class AddressDto {
  @IsNotEmpty()
  @IsString()
  line1: string;

  @IsNotEmpty()
  @IsString()
  pincode: string;
}
