import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

function validateRequest(request: Request) {
  const token = request.headers["authorization"];
  if (!token) {
    return false;
  }
  if (token === "1234") {
    return true;
  }
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const authorizationHeader: string = request.headers.authorization;
    if (!authorizationHeader) {
      throw new BadRequestException("Authorization header is required");
    }
    const token = authorizationHeader.slice(7);
    if (!token || !authorizationHeader.startsWith("Bearer ")) {
      throw new UnauthorizedException("Token is empty");
    }

    try {
      const secret = process.env.SECRET_JWT;
      const payload = this.jwtService.verify(token, { secret });
      return true;
    } catch (error) {
      return false;
    }
  }
}
