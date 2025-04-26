import { CanActivate, ExecutionContext, ForbiddenException, Inject, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { RoleGuard_KEY } from "./role.decorator";
import { roles } from "./role.enum";
import { error } from "console";


@Injectable()
export class Roleguard implements CanActivate {
    constructor(
        private readonly reflector: Reflector
    ) {

    }
    async canActivate(context: ExecutionContext): Promise<boolean> {

        const isrolehere = this.reflector.getAllAndOverride<roles[]>(RoleGuard_KEY, [
            context.getHandler(),
            context.getClass()
        ])

        if(!isrolehere) {
            return true;
        }

        try {
   
            const request = context.switchToHttp().getRequest();
            const userRole = request.user.role;
       
            
            return isrolehere.some((role) => role.includes(userRole));
        } catch(err) {
            throw new ForbiddenException();
        }
        


    }

    
    
}