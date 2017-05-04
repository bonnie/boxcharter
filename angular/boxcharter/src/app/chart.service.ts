import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class ChartService {

  constructor(private http: Http) { }

  getChart(id: number): Observable<any> {

    return this.http.get(localhost/chart)

  }

}


// import { Injectable } from '@angular/core';
// import { Http } from "@angular/http";
// import { Observable } from "rxjs/Observable";
// import "rxjs/add/operator/map" // not a class

// @Injectable()
// export class PhotoService {

//   constructor(private http: Http) { }

//   getPhoto(tag: string): Observable<any> {

//     return this.http.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=41d62fc7df8b603de615893d3d7ad83b&tags=${tag}&per_page=10&format=json&nojsoncallback=1`)
//     .map(data => data.json()); 
    
//     // => is es6 syntax, left is the input, right is the function
//     // similar to 
//     // function(data) {
//     //    data.json();
//     // }

//   }

// }
