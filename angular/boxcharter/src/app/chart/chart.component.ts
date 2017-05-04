/*
 * Copyright (c) 2017 Bonnie Schulkin. All Rights Reserved.
 * 
 * This file is part of BoxCharter.
 * 
 * BoxCharter is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, either version 3 of the License, or (at your option)
 * any later version.
 * 
 * BoxCharter is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License
 * for more details.
 * 
 * You should have received a copy of the GNU Affero General Public License
 * along with BoxCharter. If not, see <http://www.gnu.org/licenses/>.
 * 
 */

import { Component, OnInit } from '@angular/core';
import { ChartService } from "../chart.service";

@Component({
  selector: 'app-chart', // what's this?? bds 5/3
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}


/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
// import { Component } from "@angular/core";
// import { PhotoService } from "../photo.service";

// @Component({
//     styleUrls: ['./home.component.scss'],
//     templateUrl: './home.component.html',
//     providers: [ PhotoService ]
// })
// export class HomeComponent {
//     public photos: object[];

//     constructor(public photoService: PhotoService) {}


// onClick(value: string) {
//        this.photos = [];
//         this.photoService.getPhoto(value).subscribe(
//             data => {
//                 data.photos.photo.forEach (photo => {
//                     let photoData = {url: null, caption: null};
//                     // let = es6 syntax for scoped variable
//                     photoData.url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
//                     // backticks are string interpolation

//                     photoData.caption = photo.title;
//                     this.photos.push(photoData);
//                 })
//                 // console.log(data);
//             }
//         );

//         // you subscribe to an observable
//     }
// }