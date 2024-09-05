import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  url = "https://localhost:7048/api/Student/generatePdf";

  constructor(private http: HttpClient) { }

  generatePdf(): Observable<any> {
    return this.http.get(this.url, { observe: 'response', responseType: 'blob' });
  }

  getapi(): Observable<any> {
    let apikey122 = 'gfdg34khfgy786yhfdyuhugjjk';
    const headers = {'ApiKey122': apikey122, Accept: "text/plain",
      responseType:"text" }
    return this.http.get('https://localhost:7048/api/Student/getStudentById',{ headers: headers } );
  }


}
