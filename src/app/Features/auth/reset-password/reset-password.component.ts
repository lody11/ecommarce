import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ResetPasswordService } from '../../../core/services/resetPassword/reset-password.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  steps: number = 1;

  constructor(
    private reset: ResetPasswordService,
    private toastr: ToastrService,
    private auth: AuthService,
    private router:Router,
  ) {}

  sendEmail: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
  });

  submitEmail() {
    this.reset.verfyEmail(this.sendEmail.value).subscribe({
      next: (res) => {
        if (res.statusMsg == 'success') {
          this.steps = 2;
          this.toastr.success(res.message, 'success');
        }
      },
      error: (err) => {
        this.toastr.error(err.error.message, 'error');
      },
    });
  }

  verifyCode: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[0-9]{6}$/),
    ]),
  });

  submitCode(){
    this.reset.verfyCode(this.verifyCode.value).subscribe({
      next:(res) => {
        if (res.status == 'Success'){
          this.steps = 3
          this.toastr.success(res.message, 'success');
        }
      }
    })
  }

  resetPassword: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    newPassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z]\w{7}$/),
    ]),
  });

  submitPassword() {
    this.reset.resetPassword(this.resetPassword.value).subscribe({
      next: (res) => {
        if (res.token) {
          localStorage.setItem('userToken', res.token);
          this.toastr.success(res.message, 'success');
          this.auth.decodeUserDara();
          this.router.navigate(['/home']);
        }
      },
    })
  }
}
