import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { PlatFormDetetorService } from 'src/app/core/plataform-detector/platform-detector.service';

@Component({
  templateUrl: './signin.component.html',
})
export class SinginComponent implements OnInit {
  loginForm!: FormGroup;
  @ViewChild('userNameInput') 'userNameInput': ElementRef<HTMLInputElement>;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: Router,
    private platformDetectorService: PlatFormDetetorService
  ) {}

  ngOnInit(): void {
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

    this.authService.authenticate(userName, password).subscribe(
      () => this.route.navigate(['user', userName]),

      (err) => {
        console.log(err);
        this.loginForm.reset();
        this.platformDetectorService.isPlatformBrowser() &&
          this.userNameInput.nativeElement.focus();
      }
    );
  }
}
