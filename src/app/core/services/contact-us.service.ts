import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactUsService {
  headers = { 'content-type': 'application/json; charset=utf-8' };
  constructor(private http: HttpClient) {}

  postContactForm(body: any): Observable<any> {
    return this.http.post(
      'https://seamless-infotect-advertising-backend.vercel.app/api/contact-us',
      body,
      {
        headers: this.headers,
        responseType: 'json',
      }
    );
  }
}
