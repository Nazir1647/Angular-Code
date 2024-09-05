import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SqlService {
  urlApi = "http://localhost:3000/";
  url = "https://localhost:7048/api/Sql/getTableData";
  constructor(private http: HttpClient) { }


  getTable(): Observable<any> {
    return this.http.get(this.urlApi + "tableData");
  }

  // getColumns(id: number): Observable<any> {
  //   return this.http.get(this.url + "tableColumn?tableId=" + id);
  // }

  // getTable(): Observable<any> {
  //   return this.http.get(this.url);
  // }

  saveTable(data: any): Observable<any> {
    return this.http.post(this.urlApi + "tableData", data);
  }



}
