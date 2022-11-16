import { NewUser } from './new-user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const API = environment.apiUrl;
@Injectable()
export class SignUpService {
  constructor(private httpClient: HttpClient) {}

  // serviço para buscar o userName no banco
  checkUserNameTaken(userName: string) {
    return this.httpClient.get(API + '/user/exists/' + userName);
  }

  // serviço para salvar os dados do cadastro
  signup(newUser: NewUser) {
    return this.httpClient.post(API + '/user/signup', newUser);
  }
}
