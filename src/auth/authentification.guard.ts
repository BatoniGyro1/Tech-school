import { CanActivate, ExecutionContext, HttpException, HttpStatus, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Observable } from "rxjs";
import { AUTH_GUARD_KEY } from "./auth.decorator";

export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly reflector: Reflector
    ) {

    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(AUTH_GUARD_KEY, [
            context.getHandler,
            context.getClass(),
        ])
        const request = context.switchToHttp().getRequest();
        const token = this.givetoken(request);


        try {
            if(isPublic) {
                return true;
            }

            if (!token) {
                throw new Error('Token is invaild');
            }

            const verificated = await this.jwtService.verifyAsync(token,
                {
                    secret: process.env.SECRETJWTCODE

                }
            );
            if (!verificated) {
                throw new Error('Token is invaild')
            } else {
                return true;
            }

        } catch (err) {
            throw new UnauthorizedException();
        }
    }

    givetoken(request: Request) {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type == 'Bearer' ? token : undefined

    }

}