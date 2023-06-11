import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  myForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.myForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: [
        '',
        [Validators.required, Validators.minLength(8), this.passwordValidator],
      ],
    });
  }

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value;
    const regex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[A-Z])(?=.*[a-z]).+$/;
    const isValid = regex.test(value);
    return isValid ? null : { invalidPassword: true };
  }

  onSubmit() {
    if (this.myForm.invalid) {
      // Show validation error messages
      this.markAllFieldsAsTouched();
      return;
    }

    if (this.myForm.valid) {
      // Form is valid, perform necessary actions
      this.router.navigate(['/dashboard']);
      localStorage.setItem('loginMessageShown', 'true');
    }
  }

  markAllFieldsAsTouched(): void {
    Object.keys(this.myForm.controls).forEach((field) => {
      const control = this.myForm.get(field);
      control?.markAsTouched();
    });
  }
}
