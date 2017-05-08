import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { Chart } from '../chart';
import { ChartService } from '../chart.service';

@Component({
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  providers: [ ChartService ],
})
export class ChartComponent implements OnInit {
  
  // chart object for this page
  chart: Chart;
  
  constructor(
    // for getting chart data from flask
    private chartService: ChartService,

    // for getting chart ID from url
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.params

      // get chart ID from url and pass it to the chart service getChart method
      .switchMap((params: Params) => this.chartService.getChart(+params['id']))

      // bind the response to the chart object for this page
      .subscribe(chart => this.chart = chart);

  }

}
