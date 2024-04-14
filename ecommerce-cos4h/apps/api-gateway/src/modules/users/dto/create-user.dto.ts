import {
  IsString,
  IsEmail,
  Length,
  IsNotEmpty,
  IsPhoneNumber,
  IsEmpty,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @Length(8, 30)
  @IsNotEmpty()
  email: string;

  @IsString()
  @Length(3, 80)
  @IsNotEmpty()
  name: string;

  @IsString()
  @Length(4, 150)
  address: string;

  @IsPhoneNumber()
  @Length(6, 15)
  @IsNotEmpty()
  phone: string;

  @IsString()
  @Length(5, 20)
  country?: string;

  @IsString()
  @Length(5, 20)
  city?: string;

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
