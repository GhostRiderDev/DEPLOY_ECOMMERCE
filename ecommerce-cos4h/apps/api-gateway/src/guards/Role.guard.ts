import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Role } from "../enum/roles.enum";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>("roles", [
      context.getHandler(),
      context.getClass(),
    ]);
    const request: Request = context.switchToHttp().getRequest();
    const authorizationHeader: string = request.headers.authorization;
    const token = authorizationHeader.slice(7);
    if (!token) {
      throw new UnauthorizedException("Token is empty");
    }

    try {
      const secret = process.env.SECRET_JWT;
      const payload: { role: string } = this.jwtService.verify(token, {
        secret,
      });
      const hasRole = () => requiredRoles.some((role) => payload.role == role);

      const valid = payload && payload.role && hasRole();
      if (!valid) {
        throw new ForbiddenException("Unauthotized access");
      }
      return true;
    } catch (error) {
      throw new UnauthorizedException("Unauthorized access");
    }
  }
}
