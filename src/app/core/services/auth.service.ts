import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogin = false;    
  roleAs: any;

  url = "http://localhost:3000/";
  constructor(private http: HttpClient) { }


  checkCredential(form:any) {
    return this.http.get(this.url + "user?email=" + form.email);
  }

  logout() {
    localStorage.clear();
  }

  isLoggedIn() {
    const loggedIn = localStorage.getItem('name');
    if (loggedIn != null)
      this.isLogin = true;
    else
      this.isLogin = false;
    return this.isLogin;
  }

  getRole() {
    this.roleAs = localStorage.getItem('role');
    return this.roleAs;
  }

}
