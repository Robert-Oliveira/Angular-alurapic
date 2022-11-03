import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Photo } from '../photos.model';
import { PhotoService } from './../photo/photo.service';

@Injectable({ providedIn: 'root' })
export class PhotoListResolver implements Resolve<Observable<Photo[]>> {
  constructor(private service: PhotoService) {}

  // buscas os dados da api antes de carregar o compontent
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Photo[]> {
    const userName = route.params['userName'];
    return this.service.listFromUserPaginated(userName, 1);
  }
}
