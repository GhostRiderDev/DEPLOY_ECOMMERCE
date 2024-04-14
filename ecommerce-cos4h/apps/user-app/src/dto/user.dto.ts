import { IsNotEmpty, IsUUID } from 'class-validator';

export class UserDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;
  @IsNotEmpty()
  name: string;
  email: string;
  phone: string;
  address: string;
  country: string;
  city: string;
  orders: any[];
}
