import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private apiUrl = 'http://localhost:8081/api/reports';

  constructor(private http: HttpClient) { }

  getReport(reportName: string, parameters: any): Observable<Blob> {
    let params = new HttpParams();
    for (const key in parameters) {
      if (parameters.hasOwnProperty(key)) {
        params = params.set(key, parameters[key]);
      }
    }

    return this.http.get(`${this.apiUrl}/${reportName}`, {
      params: params,
      responseType: 'blob'
    });
  }
}
