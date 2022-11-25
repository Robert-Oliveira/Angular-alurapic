import { Router } from '@angular/router';
import { UserService } from './../../core/user/user.service';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import * as StackTrace from 'stacktrace-js';
import { ServerLogService } from './server-log.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(error: any): void {
    //pegar a pagina que o usuario estava quando desparou o erro
    const location = this.injector.get(LocationStrategy);
    const userService = this.injector.get(UserService);
    const serverLogService = this.injector.get(ServerLogService);
    const router = this.injector.get(Router);

    //pegar o path da pagina
    const url = location instanceof PathLocationStrategy ? location.path() : '';
    console.log('passei pelo handler');
    const message = error.menssage ? error.message : error.toString();

    if (environment.production) {
      router.navigate(['/error']);
    }
    StackTrace.fromError(error).then((stackFrames) => {
      const stackAsString = stackFrames.map((sf) => sf.toString()).join('\n');

      console.log(message);
      console.log(stackAsString);
      //o que seria enviado para o backend
      serverLogService
        .log({
          message,
          url,
          userName: userService.getUserName(),
          stack: stackAsString,
        })
        .subscribe(() => {
          console.log('Error logged on server');
        }),
        (err) => {
          console.log(err);
          console.log('Fail to send error log to server');
        };
    });
  }
}
