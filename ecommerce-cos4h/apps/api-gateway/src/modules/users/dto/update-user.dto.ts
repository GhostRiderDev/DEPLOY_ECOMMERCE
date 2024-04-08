import {
  IsString,
  IsEmail,
  Length,
  IsNotEmpty,
  IsPhoneNumber,
} from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @Length(8, 30)
  @IsNotEmpty()
  email: string;

  @IsString()
  @Length(8, 30)
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
  @Length(2, 30)
  country?: string;

  @IsString()
  @Length(2, 30)
  city?: string;
}
