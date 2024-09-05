import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  url = "http://localhost:3000/";
  constructor(private http: HttpClient) { }

  getCountry(): Observable<any> {
    return this.http.get(this.url + "country");
  }

  getState(id: number): Observable<object> {
    return this.http.get(this.url + "state?cid=" + id);
  }

  getEmployeeList() {
    return this.http.get(this.url + "employee");
  }

  getEmployeeById(id: any) {

    return this.http.get(this.url + "employee/" + id);
  }

  onSaveEmployee(form: any) {
    return this.http.post(this.url + "employee", form);
  }

  onUpdateEmployee(form: any, id: any) {
    return this.http.put(this.url + "employee/" + id, form);
  }

}
