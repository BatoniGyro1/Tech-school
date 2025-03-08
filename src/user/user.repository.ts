import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as bcrypt from 'bcrypt'



@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(UserEntity) private readonly userRepostiory: Repository<UserEntity>
    ) {

    }

    async create(createUserDto: CreateUserDto): Promise<UserEntity> {
        const created = this.userRepostiory.create(createUserDto);
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(created.password, salt);
        created.password = hash;
        return await this.userRepostiory.save(created);
    }

    async findOne(id: number): Promise<UserEntity> {
        return await this.userRepostiory.findOne({where: {id}});
    }

    async findAll(): Promise<UserEntity[]> {
        return await this.userRepostiory.find({});
    }   

    async findAllWithAdmins(): Promise<UserEntity[]>{
        return await this.userRepostiory.find({withDeleted: true});
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        return await this.userRepostiory.update(id, updateUserDto);
    }

    async remove(id: number) {
        return await this.userRepostiory.softDelete(id);
    }
    
    async restore(id: number) {
        return await this.userRepostiory.restore(id);
    }

    async findOneWithEmail(email: string) {
        return await this.userRepostiory.findOne({where: {email}})
    }
}