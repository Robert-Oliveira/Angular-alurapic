import { PhotoDetailsModule } from './photo-details/photo-details.module';
import { DarkenOnHoverModule } from './../shared/directives/darken-on-hover/darken-on-hover.module';
import { immediateClickModule } from '../shared/directives/immediate-click/immediate-click-module';
import { NgModule } from '@angular/core';

import { PhotoModule } from './photo/photo.module';
import { PhotoFormModule } from './photo-form/photo-form.module';
import { PhotoListModule } from './photo-list/photo-list.module';

@NgModule({
  imports: [
    PhotoModule,
    PhotoFormModule,
    PhotoListModule,
    DarkenOnHoverModule,
    PhotoDetailsModule,
  ],
})
export class PhotosModule {}
