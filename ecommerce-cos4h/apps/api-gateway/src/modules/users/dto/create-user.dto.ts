import { ApiBody, ApiProperty, PickType } from "@nestjs/swagger";
import {
  IsString,
  IsEmail,
  Length,
  IsNotEmpty,
  IsPhoneNumber,
  IsEmpty,
  IsStrongPassword,
  IsOptional,
} from "class-validator";

export class CreateUserDto {
  /**
   * @description this is user personal email
   * @example 'maria@gmail.com'
   * @since 1.0.0
   */
  @IsEmail()
  @Length(8, 30)
  @IsNotEmpty()
  email: string;

  /**
   * @description this is username
   * @example 'maria'
   * @since 1.0.0
   */
  @IsString()
  @Length(3, 80)
  @IsNotEmpty()
  name: string;

  /**
   * @description this address user
   * @example '+57-3045432345'
   * @since 1.0.0
   */
  @IsString()
  @Length(4, 150)
  address: string;

  /**
   * @description this is user  phone
   * @example 'maria@gmail.com'
   * @since 1.0.0
   */
  @IsPhoneNumber()
  @Length(6, 15)
  @IsNotEmpty()
  phone: string;

  /**
   * @description this is user  country
   * @example 'United States'
   * @since 1.0.0
   */
  @IsString()
  @Length(5, 20)
  @IsOptional()
  country?: string;

  /**
   * @description this is user  city
   * @example 'Houston'
   * @since 1.0.0
   */
  @IsString()
  @Length(5, 20)
  @IsOptional()
  city?: string;

  /**
   * @description 'this is user  password'
   * @example '.@Mluk12345'
   * @since 1.0.0
   */
  @IsNotEmpty()
  @IsString()
  @Length(8, 15)
  @IsStrongPassword({
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;
}

export class UserToSignin extends PickType(CreateUserDto, [
  "email",
  "password",
]) {}
