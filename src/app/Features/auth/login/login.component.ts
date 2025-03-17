import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {FormControl,FormGroup,ReactiveFormsModule,Validators,} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  errMsg: string = '';
  isLoading: boolean = false;
  constructor(private auth: AuthService, private router: Router) {}

  // FormGoroup
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });

  submitForm() {
    this.isLoading = true;
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value).subscribe({
        next: (res: any) => {
          this.isLoading = false;
          if (res.message == 'success') {
            this.router.navigate(['/home']);
            localStorage.setItem('userToken', res.token);
            this.auth.decodeUserDara();
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.errMsg = err.error.message;
        },
      });
    }
  }
}
