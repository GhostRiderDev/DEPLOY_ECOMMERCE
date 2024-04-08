import { Injectable, NestInterceptor } from '@nestjs/common';

@Injectable()
export class DateAdderInterceptor implements NestInterceptor {
  intercept(context, next) {
    const now = new Date();
    console.log(now);
    const format = now.toLocaleDateString('es-CO', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    const request = context.switchToHttp().getRequest();
    request.now = format;
    return next.handle();
  }
}
