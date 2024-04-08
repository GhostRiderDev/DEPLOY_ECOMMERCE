import { Max, Min } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Product')
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ length: 40, nullable: false, unique: true })
  name: string;

  @Column({ length: 100, nullable: false })
  description: string;

  @Column({ type: 'float', nullable: false })
  price: number;

  @Column({ type: 'int', nullable: false })
  @Min(0)
  @Max(10000)
  stock: number;

  @Column({ length: 100, nullable: false })
  imgUrl: string;
}

// Hazme un statement sql de posgres para insertar un dato de prueba
// INSERT INTO "Product" (name, description, price, stock, imgUrl) VALUES ('test', 'test', 10.0, 10, 'test');
