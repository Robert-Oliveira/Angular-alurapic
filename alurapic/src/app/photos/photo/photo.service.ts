import { catchError, map } from 'rxjs/operators';
import { PhotoComment } from './photo-comment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Photo } from '../photos.model';
import { of, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';

const API = environment.apiUrl;

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

  upload(description: string, allowComments: boolean, file: File) {
    const formData = new FormData();
    formData.append('description', description);
    formData.append('allowComments', allowComments ? 'true' : 'false');
    formData.append('imageFile', file);

    return this.http.post(API + '/photos/upload', formData);
  }

  findById(photoId: number) {
    return this.http.get<Photo>(API + '/photos/' + photoId);
  }

  getComments(photoId: number) {
    return this.http.get<PhotoComment[]>(
      API + '/photos/' + photoId + '/comments'
    );
  }

  addComment(photoId: number, commentText: string) {
    return this.http.post(API + '/photos/' + photoId + '/comments', {
      commentText,
    });
  }

  removePhoto(photoId: number) {
    return this.http.delete(API + '/photos/' + photoId);
  }

  //serviço para enviar um like, e tratar o erro '304' caso houver um erro esperado

  like(photoId: number) {
    return this.http
      .post(API + '/photos/' + photoId + '/like', {}, { observe: 'response' })
      .pipe(map((res) => true))
      .pipe(
        catchError((err) => {
          return err.status == '304' ? of(false) : throwError(err);
        })
      );
  }
}
