import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { UserService } from '../user/user.service';

import { environment } from 'src/environments/environment';

const API = environment.apiUrl;
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) {}

  authenticate(userName: string, password: String) {
    return this.httpClient
      .post(
        API + '/user/login',
        {
          userName: userName,
          password: password,
        },
        { observe: 'response' }
      )
      .pipe(
        tap((res) => {
          const authToken = res.headers.get('x-access-token');
          this.userService.setToken(authToken);
          console.log(`User ${userName} authenticated with token ${authToken}`);
        })
      );
  }
}
