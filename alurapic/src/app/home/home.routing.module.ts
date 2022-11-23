import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from '../core/auth/login.guard';
import { HomeComponent } from './home.component';
import { SinginComponent } from './signin/signin.component';
import { SignUpComponent } from './signup/signup.component';

//modulo lazy
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [LoginGuard],
    //rotas filha
    children: [
      { path: '', component: SinginComponent, data: { title: 'Sign in' } },
      {
        path: 'signup',
        component: SignUpComponent,
        data: { title: 'Sign up' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
