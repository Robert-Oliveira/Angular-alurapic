import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Photo } from '../photos.model';

const API = 'http://localhost:3000';

@Injectable({ providedIn: 'root' })
export class PhotoService {
  constructor(private http: HttpClient) {}

  // serviço para listar todas as fotos da api
  listFromUser(userName: string) {
    return this.http.get<Photo[]>(API + '/' + userName + '/photos');
  }

  // serviço para paginar as fotos da api
  listFromUserPaginated(userName: string, page: number) {
    const params = new HttpParams().append('page', page.toString());
    return this.http.get<Photo[]>(API + '/' + userName + '/photos', { params });
  }
}
