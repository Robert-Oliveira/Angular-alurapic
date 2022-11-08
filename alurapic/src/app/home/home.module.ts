import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SinginComponent } from './signin/signin.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VmessageModule } from '../shared/components/card/vmessage/vmessagem.module';
import { SignUpComponent } from './signup/signup.component';

@NgModule({
  declarations: [SinginComponent, SignUpComponent],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    VmessageModule,
    RouterModule,
  ],
})
export class HomeModule {}
