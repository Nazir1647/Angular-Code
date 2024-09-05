import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  url = "http://localhost:3000/";
  constructor(private http: HttpClient) { }

  getCountry(): Observable<any> {
    return this.http.get(this.url + "country");
  }

  getState(id: number): Observable<object> {
    return this.http.get(this.url + "state?cid=" + id);
  }

  getStudentList() {
    return this.http.get(this.url + "student");
  }

  getStudentById(id: any) {
    return this.http.get(this.url + "student/" + id);
  }

  onSaveStudent(form: any) {
    return this.http.post(this.url + "student", form);
  }

  onUpdateStudent(form: any, id: any) {
    return this.http.put(this.url + "student/" + id, form);
  }

  onDeleteStudent(id: any) {
    return this.http.delete(this.url + "student/" + id,);
  }
}
