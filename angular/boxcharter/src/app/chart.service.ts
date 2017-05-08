import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/toPromise';
import { Chart } from './chart';

@Injectable()
export class ChartService {

  constructor(private http: Http) { }

  getChart(id: number): Promise<Chart> {
    // console.log(`id: ${id}`);
    const url = `http://localhost:5050/chart/${id}`
    return this.http.get(url)
                    .toPromise()
                    .then(response => response.json() as Chart)
                    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    // TODO: really handle errors here, not just console.log
    console.error('An error occurred', error); 
    return Promise.reject(error.message || error);
  }
}