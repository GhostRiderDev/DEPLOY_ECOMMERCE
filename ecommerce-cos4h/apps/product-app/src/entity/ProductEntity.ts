import { Max, Min } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CategoryEntity } from './CategoryEntity';

@Entity({ name: 'Product' })
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({ type: 'int', nullable: false })
  @Min(0)
  stock: number;

  @Column({
    name: 'image_url',
    type: 'varchar',
    length: 255,
    nullable: true,
    default:
      'https://cdns.iconmonstr.com/wp-content/releases/preview/2019/240/iconmonstr-product-3.png',
  })
  imageUrl: string;

  @Column({ type: 'int', nullable: false, name: 'id_category' })
  idCategory: number;

  @ManyToOne(() => CategoryEntity, (category) => category.products)
  @JoinColumn({ name: 'id_category' })
  category: CategoryEntity;
}
