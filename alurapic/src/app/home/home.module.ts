import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SinginComponent } from './signin/signin.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VmessageModule } from '../shared/components/vmessage/vmessagem.module';
import { SignUpComponent } from './signup/signup.component';
import { HomeRoutingModule } from './home.routing.module';
import { SignUpService } from './signup/signup.service';

@NgModule({
  declarations: [SinginComponent, SignUpComponent, HomeComponent],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    VmessageModule,
    RouterModule,
    HomeRoutingModule,
  ],
  providers: [SignUpService],
})
export class HomeModule {}
