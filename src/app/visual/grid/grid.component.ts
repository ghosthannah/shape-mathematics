import { Component, AfterViewInit, Input, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'geo-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements AfterViewInit {
  public randomId: string = '';
  public randomized: string = '';
  public colorArray: any;
  public colors: any;

  @Input() gridSize: number = 30;
  @Input() intervalX: number = 10;
  @Input() intervalY: number = 10;
  @Input() addSubgrid: boolean = false;

  constructor() {
    this.randomized = 'grid' + this.getRandomNumber(10000, 99999);
    this.randomId = '#' + this.randomized;
    this.colors = {
      quilt: {
        colorArray: [
          'blue',
          'aquamarine',
          'aqua',
          'lightgreen',
          'lightseagreen',
          'turquoise',
          'teal',
          'indigo',
          'darkmagenta',
          'blueviolet',
          'navy',
          'midnightblue',
          'mediumturquoise',
          'deepskyblue',
          'dodgerblue',
          'blue',
          'aquamarine',
          'aqua',
          'lightgreen',
          'lightseagreen',
          'turquoise',
          'teal',
          'indigo',
          'darkmagenta',
          'blueviolet',
          'navy',
          'midnightblue',
          'mediumturquoise',
          'deepskyblue',
          'dodgerblue',
          'deeppink',
          'lawngreen',
          'orange',
          'yellow',
          'red',
          'crimson',
          'darkorange',
          'darkred',
          'hotpink',
          'lightpink',
          'green',
          'coral',
          'lavender',
          'limegreen',
          'gold',
          'maroon',
          'mediumvioletred',
        ],
      },
    };
    this.colorArray = this.colors.quilt.colorArray;
  }

  ngAfterViewInit() {
    setTimeout(() => this.drawData(), 100);
  }

  getRandomNumber = (a: number, b: number) => {
    const min: number = Math.ceil(a);
    const max: number = Math.floor(b);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  getRandomColor = () => {
    const color = this.colorArray[
      Math.floor(Math.random() * this.colorArray.length)
    ];
    return color;
  };

  ngOnChanges(change: SimpleChanges) {
    if (
      change.gridSize ||
      change.intervalY ||
      change.intervalX ||
      change.addSubgrid
    ) {
      this.redrawChart();
      if (this.addSubgrid) {
        this.addSubgridToGrid();
      }
    }
  }

  redrawChart() {
    const elem = document.getElementById('grid-sq' + this.randomized);
    if (elem && elem.parentNode) {
      elem.parentNode.removeChild(elem);
    }
    this.drawData();
  }

  addSubgridToGrid = () => {
    const color = this.getRandomColor();
    const size = this.gridSize;
    const intervalHeight = this.intervalY;
    const intervalWidth = this.intervalX;
    const height = size * intervalHeight;
    const width = size * intervalWidth;
    const subgridOffset = this.gridSize / 2;

    d3.selectAll('.grid-box').each(function (data, index) {
      for (let i = 0; i < intervalWidth + 1; i++) {
        d3.select(this)
          .append('line')
          .style('stroke', color)
          .style('stroke-width', 1)
          .style('stroke-opacity', 0.7)
          .attr('x1', subgridOffset + size * i)
          .attr('y1', 0)
          .attr('x2', subgridOffset + size * i)
          .attr('y2', height);
      }
    });

    d3.selectAll('.grid-box').each(function (data, index) {
      for (let i = 0; i < intervalHeight + 1; i++) {
        d3.select(this)
          .append('line')
          .style('stroke', color)
          .style('stroke-width', 1)
          .style('stroke-opacity', 0.7)
          .attr('x1', 0)
          .attr('y1', subgridOffset + size * i)
          .attr('x2', width)
          .attr('y2', subgridOffset + size * i);
      }
    });
  };

  drawData = () => {
    const size = this.gridSize;
    const intervalHeight = this.intervalY;
    const intervalWidth = this.intervalX;
    const height = size * intervalHeight;
    const width = size * intervalWidth;
    d3.selectAll('geo-grid')
      .select(this.randomId)
      .append('svg')
      .attr('id', 'grid-sq' + this.randomized)
      .attr('class', 'grid-box')
      .attr('width', width)
      .attr('height', height);

    d3.selectAll('.grid-box').each(function (data, index) {
      for (let i = 0; i < intervalWidth + 1; i++) {
        d3.select(this)
          .append('line')
          .style('stroke', 'grey')
          .style('stroke-width', 1)
          .style('stroke-opacity', 0.7)
          .attr('x1', size * i)
          .attr('y1', 0)
          .attr('x2', size * i)
          .attr('y2', height);
      }
    });

    d3.selectAll('.grid-box').each(function (data, index) {
      for (let i = 0; i < intervalHeight + 1; i++) {
        d3.select(this)
          .append('line')
          .style('stroke', 'grey')
          .style('stroke-width', 1)
          .style('stroke-opacity', 0.7)
          .attr('x1', 0)
          .attr('y1', size * i)
          .attr('x2', width)
          .attr('y2', size * i);
      }
    });
  };
}
