import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_URL } from '../constants';

@Injectable({providedIn: 'root'})
export class OwnerService {
  public API = APP_URL.MAIN;
  public OWNER_API = this.API + APP_URL.OWNER_ROUTE;

  constructor(private http: HttpClient) { }

  getAllOwners(): Observable<any> {
    return this.http.get(this.OWNER_API);
  }

  getOwner(id: string) {
    return this.http.get(this.OWNER_API + '/' + id);
  }

  deleteOwner(ownerId: string): Observable<any>  {
    return this.http.delete(this.OWNER_API + '/' + ownerId );
  }

  updateOwner(owner: any, id): Observable<any>  {
    return this.http.put(this.OWNER_API + '/' + id, owner );
  }

  saveOwner(owner: any): Observable<any>  {
    return this.http.post(this.OWNER_API, owner );
  }
}
