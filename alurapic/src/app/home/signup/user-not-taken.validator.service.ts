import { SignUpService } from './signup.service';
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { debounceTime, switchMap, map, first } from 'rxjs/operators';
@Injectable()
export class UserNotTakenValidatorService {
  constructor(private signUpService: SignUpService) {}

  //função para chekar se o banco não possui algum usuario cadastrado com o mesmo userName
  checkUserNameTaken() {
    return (control: AbstractControl) => {
      return (
        control.valueChanges
          //pipe()função recebe como argumentos as funções que você deseja combinar e retorna uma nova função que,
          //quando executada, executa as funções compostas em sequência.
          .pipe(debounceTime(300))
          .pipe(
            //switchMap() para de executar a função anterior e exucuta a proxima função
            switchMap((userName) =>
              this.signUpService.checkUserNameTaken(userName)
            )
          )
          //map() Aplica uma determinada projectfunção a cada valor emitido pelo Observable de origem e emite os valores resultantes como um Observable.
          .pipe(map((isTaken) => (isTaken ? { userNameTaken: true } : null)))
          //first() Emite apenas o primeiro valor (ou o primeiro valor que atende a alguma condição) emitido pela fonte Observável.
          .pipe(first())
      );
    };
  }
}
