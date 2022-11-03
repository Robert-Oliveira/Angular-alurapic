import { PhotoService } from './../photo/photo.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Photo } from '../photos.model';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css'],
})
export class PhotoListComponent implements OnInit, OnDestroy {
  photos: Photo[] = [];
  filter: string = '';
  debounce: Subject<string> = new Subject<string>();
  hasMore: boolean = true;
  currentPage: number = 1;
  userName: string = '';
  constructor(
    private activatedRoute: ActivatedRoute,
    private photoService: PhotoService
  ) {}

  ngOnInit(): void {
    this.userName = this.activatedRoute.snapshot.params['userName'];
    this.photos = this.activatedRoute.snapshot.data['photos'];
    // aplicar um tempo de 300ms depois do ultimo caracter digitado para diminuir o número de requisições
    this.debounce
      .pipe(debounceTime(300))
      .subscribe((filter) => (this.filter = filter));
  }

  ngOnDestroy(): void {
    // destruir o componente para não ficar alocando espaço em memoria
    this.debounce.unsubscribe();
  }

  // metodo para pegar as fotos que vieram da api e adiona a lista, se não veio dados hasMore vira falso e oculta o botão
  load() {
    this.photoService
      .listFromUserPaginated(this.userName, ++this.currentPage)
      .subscribe((photos) => {
        this.photos = this.photos.concat(photos);
        if (!photos.length) this.hasMore = false;
      });
  }
}
