import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  url='http://localhost:3000/user';

  constructor(private http:HttpClient) { }

  saveUser(user:any){
    return this.http.post(this.url,user);
  }

  getUser(){
    return this.http.get(this.url);
  }

  updateUser(user:any,id:string){
    return this.http.put(`${this.url}/${id}` ,user);
  }

  deleteUser(id:string){
    return this.http.delete(`${this.url}/${id}`);
  }

}
