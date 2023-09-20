import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class TimeApiService {
  private apiUrl = 'http://localhost/clock_app/Backend/timezone_api.php';
  constructor(private http: HttpClient) {}

  getCurrentTime(timezone: string): Observable<any> {
    const url = `${this.apiUrl}?timezone = ${timezone}`;
    return this.http.get(url);
  }
}
