import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ApiGatewayService {
  getAll(
    userApp: Observable<any>,
    productApp: Observable<any>,
  ): Observable<any> {
    // debo retornar un observable que contenga ambos arreglos
    return Observable.create((observer) => {
      observer.next({ users: userApp, products: productApp });
      observer.complete();
    });
  }
}
