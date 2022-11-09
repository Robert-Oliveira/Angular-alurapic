import { TokenService } from './../token/token.service';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService) {}

  // interceptadores do Http Client interceptador para verificar se o usuário está logado,
  //em qualquer requisição feita ao back end. Caso esteja, o token será anexado ao cabeçalho da mesma.
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.tokenService.hasToken()) {
      const token = this.tokenService.getToken()!;
      req = req.clone({
        setHeaders: { 'x-access-token': token },
      });
    }
    return next.handle(req);
  }
}
