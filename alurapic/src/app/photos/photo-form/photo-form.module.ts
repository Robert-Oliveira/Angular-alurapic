import { immediateClickModule } from './../../shared/immediate-click/immediate-click-module';
import { PhotoModule } from './../photo/photo.module';
import { RouterModule } from '@angular/router';
import { VmessageModule } from './../../shared/components/card/vmessage/vmessagem.module';
import { PhotoFormComponent } from './photo-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [PhotoFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    VmessageModule,
    FormsModule,
    RouterModule,
    PhotoModule,
    immediateClickModule,
  ],
})
export class PhotoFormModule {}
