import { NewUser } from './new-user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_URL = 'http://localhost:3000';
@Injectable({ providedIn: 'root' })
export class SignUpService {
  constructor(private httpClient: HttpClient) {}

  // serviço para buscar o userName no banco
  checkUserNameTaken(userName: string) {
    return this.httpClient.get(API_URL + '/user/exists/' + userName);
  }

  // serviço para salvar os dados do cadastro
  signup(newUser: NewUser) {
    return this.httpClient.post(API_URL + '/user/signup', newUser);
  }
}
