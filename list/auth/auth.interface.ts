import { roles } from "src/auth/role.enum";

export interface tokenInterface{
    id: number,
    name: string,
    email: string;
    role: roles;
}