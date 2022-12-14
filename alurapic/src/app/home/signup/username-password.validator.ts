import { ValidatorFn, FormGroup } from '@angular/forms';

//validador para checar se nome e senha são diferentes
export const userNamePassword: ValidatorFn = (formGroup: FormGroup) => {
  const userName = formGroup.get('userName').value;
  const password = formGroup.get('password').value;

  if (userName.trim() + password.trim()) {
    return userName != password ? null : { userNamePassword: true };
  } else {
    return null;
  }
};
