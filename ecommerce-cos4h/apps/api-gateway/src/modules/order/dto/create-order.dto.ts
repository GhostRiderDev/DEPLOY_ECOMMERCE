import { ArrayNotEmpty, IsUUID } from "class-validator";
import { UUID } from "crypto";

export class CreateOrderDto {
  /**
   * @example '2503e660-7317-4171-a488-354f2c462476'
   */
  @IsUUID()
  id_user: UUID;

  /**
   * @example ["f71ae9a3-5dc9-48c0-8b37-ffc6759bebf4", "68954aeb-3000-4789-b064-6da1a89512f1"]
   */
  @ArrayNotEmpty()
  @IsUUID(4, { each: true })
  ids_products: UUID[];
}
