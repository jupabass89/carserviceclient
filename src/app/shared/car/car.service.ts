import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_URL } from '../constants';

@Injectable({providedIn: 'root'})
export class CarService {
  public API = APP_URL.MAIN;
  public CAR_API = this.API + APP_URL.CAR_ROUTE;

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(this.API + APP_URL.COOL_CARS);
  }

  get(id: string) {
    return this.http.get(this.CAR_API + '/' + id);
  }

  save(car: any): Observable<any> {
    let result: Observable<Object>;
    if (car['href']) {
      result = this.http.put(car.href, car);
    } else {
      result = this.http.post(this.CAR_API, car);
    }
    return result;
  }

  remove(href: string) {
    return this.http.delete(href);
  }
}
