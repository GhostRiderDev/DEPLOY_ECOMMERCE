import { ArrayNotEmpty, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class CreateOrderDto {
  @IsUUID()
  id_user: UUID;
  @ArrayNotEmpty()
  @IsUUID(4, { each: true })
  ids_products: UUID[];
}
