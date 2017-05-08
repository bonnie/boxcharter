import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/toPromise';
import { Chart } from './chart';

@Injectable()
export class ChartService {

  constructor(private http: Http) { }

  getChart(id: number): Promise<Chart> {
    return this.http.get(`http://localhost:5050/chart/${id}`)
                    .toPromise()
                    .then(response => response.json().data as Chart)
                    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    // TODO: really handle errors here, not just console.log
    console.error('An error occurred', error); 
    return Promise.reject(error.message || error);
  }
}