import { Photo } from './../../photos.model';
import { Directive, Input, ElementRef, Renderer2, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/user/user.service';

@Directive({
  selector: '[photoOwnerOnly]',
})
export class PhotoOwnerOnlyDirective implements OnInit {
  @Input() ownedPhoto: Photo;

  constructor(
    private element: ElementRef<any>,
    private renderer: Renderer2,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    //ocultar o icone de excluir da tela do usuario quando o id desse usuario é diferente do id do usuario da foto
    this.userService.getUser().subscribe((user) => {
      if (!user || user.id !== this.ownedPhoto.userId) {
        this.renderer.setStyle(this.element.nativeElement, 'display', 'none');
      }
    });
  }
}
