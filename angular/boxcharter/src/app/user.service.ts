import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  getUser(id: number): Observable<any> {

    return this.http.get(`http://localhost:5050/user/${id}`);

  }

}
