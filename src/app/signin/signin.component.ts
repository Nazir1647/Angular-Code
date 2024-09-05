import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';
import { ToastService } from '../shared/toast.service';
import { Router } from '@angular/router';
import {message} from '../core/Constant/messages.constants'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  signinForm: FormGroup;
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.signinForm = this.fb.group({
      email: [''],
      password: [''],
    });
  }

  get signinFormControls() {
    return this.signinForm.controls;
  }

  onLogin() {
    this.authService.checkCredential(this.signinForm.value).subscribe({
      next: (res: any) => {
        if (res.length == 0) {
          this.toastService.error(message.LOGIN_FAILURE);
          return;
        }

        if (res[0].password === this.signinForm.controls['password'].value) {
          localStorage.setItem('name', res[0].name);
          localStorage.setItem('role', 'admin')
         this.router.navigate(['/addemployee']);
          this.toastService.success(message.LOGIN_SUCCESS);

        } else {
          this.toastService.error(message.LOGIN_FAILURE);
        }
      },
      error: (err) => {
        this.toastService.error(err);
      }
    });
  }

}
