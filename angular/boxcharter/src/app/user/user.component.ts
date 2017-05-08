import { Component, OnInit } from '@angular/core';
import { Chart } from '../chart';

const CHARTS: Chart[] = [
];

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {

  charts = CHARTS;
  selectedChart: Chart;

  onSelect(chart: Chart): void {
    this.selectedChart = chart;
  }

  constructor() { }

  ngOnInit() {

  }

}
