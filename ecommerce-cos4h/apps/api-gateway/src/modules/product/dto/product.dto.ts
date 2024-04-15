import { UUID } from "crypto";

export class ProductDto {
  id: UUID;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  idCategory: number;
}
