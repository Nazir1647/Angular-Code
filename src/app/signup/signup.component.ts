import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../shared/custom-validators';
import { SignupService } from '../services/signup.service';
import { UserListComponent } from '../user-list/user-list.component';
import { ToastService } from '../shared/toast.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  userList: any;
  userDetails: any;
  btnName = "Save";
  forEditDetaild:any;

  @ViewChild(UserListComponent ) userComponent: UserListComponent;  // call child component method from parent component

  constructor(private fb: FormBuilder,
    private signup: SignupService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {

    this.signupForm = this.fb.group({
      name: ['', [Validators.required]],
      email: [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$')]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    },
      { validator: this.passwordMatchValidator });

      localStorage.removeItem('signupId');
  }

  passwordMatchValidator(frm: FormGroup) {
    return frm.controls['password'].value === frm.controls['confirmPassword'].value ? null : { 'mismatch': true };
  }

  get signupFormControls() {
    return this.signupForm.controls;
  }

  onSave() {

    const object = {
      name: this.signupFormControls['name'].value,
      email: this.signupFormControls['email'].value,
      password: this.signupFormControls['password'].value,
    }

    let id = localStorage.getItem('signupId');
    if (id === null) {
      this.signup.saveUser(object).subscribe((res) => {
        this.toastService.success('Data save succesfully!');
        this.userComponent.onGetUserList();
        localStorage.removeItem('signupId');
        this.btnName = "Save";
        this.signupForm.reset();
      });
    }else{
      this.signup.updateUser(object,id).subscribe((res) => {
        this.toastService.success('Data update succesfully!!');
        this.userComponent.onGetUserList();
        localStorage.removeItem('signupId');
        this.btnName = "Save";
        this.signupForm.reset();
      });
    }
  }

  onEdit(data: any) {
      this.signupForm.patchValue({
        name: data.name,
        email: data.email,
        password: data.password,
        confirmPassword: data.password,
      });
      localStorage.setItem("signupId", data.id);
      this.btnName = "Update";
  }

}
