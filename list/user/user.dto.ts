import { Expose } from "class-transformer";

export class UserRensponseDto {
    @Expose()
    id: number;

    @Expose()
    name: string;
    
    @Expose()
    email: string;


    
}