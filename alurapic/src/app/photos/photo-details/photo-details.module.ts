import { ShowIfLoggedModule } from './../../shared/directives/show-if-logged/show-if-directive.module';
import { PhotoOwnerOnlyDirective } from './photo-owner-only/photo-owner-only.directive';
import { VmessageModule } from '../../shared/components/vmessage/vmessagem.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PhotoCommentsComponent } from './photo-comments/photo-comments.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PhotoModule } from '../photo/photo.module';
import { PhotoDetailsComponent } from './photo-details.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    PhotoDetailsComponent,
    PhotoCommentsComponent,
    PhotoOwnerOnlyDirective,
  ],
  exports: [PhotoDetailsComponent, PhotoCommentsComponent],
  imports: [
    CommonModule,
    PhotoModule,
    RouterModule,
    ReactiveFormsModule,
    VmessageModule,
    ShowIfLoggedModule,
  ],
})
export class PhotoDetailsModule {}
