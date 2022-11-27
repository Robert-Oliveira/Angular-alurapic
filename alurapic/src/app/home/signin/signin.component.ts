import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { PlatFormDetetorService } from 'src/app/core/plataform-detector/platform-detector.service';

@Component({
  templateUrl: './signin.component.html',
})
export class SinginComponent implements OnInit {
  fromUrl: string;

  loginForm!: FormGroup;
  @ViewChild('userNameInput') 'userNameInput': ElementRef<HTMLInputElement>;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: Router,
    private platformDetectorService: PlatFormDetetorService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.fromUrl = params['fromUrl'];
    });
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  ngAfterViewInit() {
    this.platformDetectorService.isPlatformBrowser() &&
      this.userNameInput.nativeElement.focus();
  }

  login() {
    const userName = this.loginForm.get('userName')?.value;
    const password = this.loginForm.get('password')?.value;

    this.authService.authenticate(userName, password).subscribe({
      next: () => {
        this.fromUrl
          ? //fazer a navegação após o login para um rota que o usuario acessou que era privada
            this.route.navigateByUrl(this.fromUrl)
          : this.route.navigate(['user', userName]);
      },
      error: () => {
        this.loginForm.reset();
        this.platformDetectorService.isPlatformBrowser() &&
          this.userNameInput.nativeElement.focus();
      },
    });
  }
}
