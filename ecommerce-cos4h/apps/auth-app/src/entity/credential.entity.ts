import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Credential' })
export class CredentialEntity {
  @PrimaryGeneratedColumn('uuid')
  id_credential: string;

  @Column({ type: 'varchar', nullable: false, unique: true, length: 100 })
  email: string;

  @Column({ type: 'varchar', nullable: false, length: 150 })
  password_hash: string;
}
