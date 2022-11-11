import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  //funçao de guarda de rotas, garante que ou usuario não tenha acesso a determinada pagina se já estiver logado
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    if (this.userService.isLogged()) {
      this.router.navigate(['user', this.userService.getUserName()]);
      return false;
    }
    return true;
  }
}
