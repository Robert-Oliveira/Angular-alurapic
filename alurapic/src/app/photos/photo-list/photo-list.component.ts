import { PhotoService } from './../photo/photo.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Photo } from '../photos.model';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css'],
})
export class PhotoListComponent implements OnInit {
  photos: Photo[] = [];
  filter: string = '';
  hasMore: boolean = true;
  currentPage: number = 1;
  userName: string = '';
  constructor(
    private activatedRoute: ActivatedRoute,
    private photoService: PhotoService
  ) {}

  ngOnInit(): void {
    //Dessa maneira, ainda que nosso componente seja carregado uma única vez enquanto
    //troca de rotas, quando isso ocorrer o parâmetro da rota será coletado,
    //lançado para o userName então os dados serão colhidos.
    this.activatedRoute.params.subscribe((params) => {
      this.userName = params['userName'];
      this.photos = this.activatedRoute.snapshot.data['photos'];
    });
  }

  // metodo para pegar as fotos que vieram da api e adiona a lista, se não veio dados hasMore vira falso e oculta o botão
  load() {
    this.photoService
      .listFromUserPaginated(this.userName, ++this.currentPage)
      .subscribe((photos) => {
        this.filter = '';
        this.photos = this.photos.concat(photos);
        if (!photos.length) this.hasMore = false;
      });
  }
}
