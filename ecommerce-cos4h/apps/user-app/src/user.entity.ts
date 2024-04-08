import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('User')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  //! @Column({ length: 100, unique: true, nullable: false })
  //! email: string; ademas la password
  @Column({ length: 50, nullable: false })
  name: string;
  @Column({ length: 100, nullable: false })
  address: string;
  @Column({ length: 20, nullable: false })
  phone: string;
  @Column({ length: 50, nullable: true })
  country?: string | undefined;
  @Column({ length: 50, nullable: true })
  city?: string | undefined;
  @Column({ length: 50, nullable: true, type: 'uuid' })
  id_credentials?: string;
}
