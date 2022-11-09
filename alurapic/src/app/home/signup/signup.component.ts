import { PlatFormDetetorService } from './../../core/plataform-detector/platform-detector.service';
import { Router } from '@angular/router';
import { SignUpService } from './signup.service';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { lowerCaseValidator } from 'src/app/shared/validators/lower-case-validators';
import { NewUser } from './new-user';

@Component({
  templateUrl: './signup.component.html',
  providers: [UserNotTakenValidatorService],
})
export class SignUpComponent implements OnInit {
  signupForm!: FormGroup;
  //pegar um campo do template e atribuir a uma variavel
  @ViewChild('emailInput') emailInput!: ElementRef<HTMLInputElement>;

  constructor(
    private formBuilder: FormBuilder,
    private UserNotTakenValidatorService: UserNotTakenValidatorService,
    private signUpService: SignUpService,
    private router: Router,
    private platFormDetetorService: PlatFormDetetorService
  ) {}
  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      fullName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(40),
        ],
      ],

      userName: [
        '',
        [
          Validators.required,
          lowerCaseValidator,
          // Validators.pattern(/^[a-z0-9_\-]+$/),
          Validators.minLength(2),
          Validators.maxLength(30),
        ],
        this.UserNotTakenValidatorService.checkUserNameTaken(),
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(14),
        ],
      ],
    });
  }
  //deixar o primeiro campo de formulario em destaque sempre que a pagina carregar
  ngAfterViewInit() {
    this.platFormDetetorService.isPlatformBrowser() &&
      this.emailInput.nativeElement.focus();
  }

  //função para salvar os dados do cadastro e redireciona para pagina de login
  signup() {
    //getRawValue() dá um objeto javascript com os valores preenchidos no formulario
    const newUser = this.signupForm.getRawValue() as NewUser;
    this.signUpService.signup(newUser).subscribe(
      () => this.router.navigate(['']),
      (err) => console.log(err)
    );
  }
}
