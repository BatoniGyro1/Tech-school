import { roles } from "src/auth/role.enum";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";



@Entity({name: "user"})
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({type: 'varchar'})
    email: string;

    @Column({type: 'varchar'})
    password: string;

    @Column({nullable: true})
    parentNumber: string;

    @Column()
    phoneNumber: string;

    @Column({type: 'enum', enum: roles})
    role: roles

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
