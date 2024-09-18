import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharingService {
  constructor(private http: HttpClient) {}

  getServiceData(): Observable<any> {
    return this.http.get('assets/json/service.json');
  }
  getReviews(): Observable<any> {
    return this.http.get('assets/json/reviews.json');
  }
  getfeaturedProjects(): Observable<any> {
    return this.http.get('assets/json/featured.json');
  }
}
