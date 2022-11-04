import { DarkenOnHoverModule } from './../../shared/directives/darken-on-hover/darken-on-hover.module';
import { CardModule } from './../../shared/components/card/card.module';
import { PhotoModule } from './../photo/photo.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadButtonComponent } from './load-button/load-button.component';
import { PhotosComponent } from './photos/photos.component';
import { PhotoListComponent } from './photo-list.component';
import { filterByDescription } from '../filter-by-description.pipe';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    PhotoListComponent,
    PhotosComponent,
    LoadButtonComponent,
    filterByDescription,
    SearchComponent,
  ],
  imports: [CommonModule, PhotoModule, CardModule, DarkenOnHoverModule],
})
export class PhotoListModule {}
