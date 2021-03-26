import { Component, AfterViewInit, Input, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'geo-tiles',
  templateUrl: './tiles.component.html',
  styleUrls: ['./tiles.component.scss']
})
export class TilesComponent implements AfterViewInit {
  public randomId: string = '';
  public randomized: string = '';
  public colorArray: any;
  public colors: any;
  public gridSize: number = 10;
  public tileA: string = "tileA";
  public tileB: string = "tileB";
  public scale: number = 5;

  constructor() { }

  ngAfterViewInit() {
    setTimeout(() => this.drawData(), 100);
  }

  drawData = () => {
    let i, j;
    const id = "#" + this.tileA;
    const scale = 10;
    const width = 48;
    const height = 90;
    const tileHeight = 3;
    const tileWidth = 6;
    let tileW = tileWidth;
    let tileH = tileHeight;
    let offset = 0;
    d3.selectAll('#tiles')
      .select(id)
      .append("svg")
      .attr("class", "horizontal-line-quilt")
      .attr("width", width * scale)
      .attr("height", height * scale)
      .style("fill", "#ccc");

    d3.selectAll('.horizontal-line-quilt')
      .each(function (data, index) {
        const sizeW = tileWidth * scale;
        const sizeH = tileHeight * scale;

        for (i = 0; i < 2; i++) {
          const offset = i === 0 ? 4 : 0;
          for (j = 0; j < height / tileHeight; j++) {
            const y = (j + 1) * sizeH; // 1 => 2
            const y1 = y - sizeH; // 0 => 1
            const y2 = (j + 2) * sizeH; // 2 => 3
            const y3 = (j + 3) * sizeH; // 3 => 4

            const x = (j + 1) * sizeH + (offset * sizeH); // 1 => 2
            const x1 = x - sizeH + (offset * sizeH); // 0 => 1
            const x2 = (j + 2) * sizeH + (offset * sizeH); // 2 => 3
            const x3 = (j + 3) * sizeH + (offset * sizeH); // 3 => 4

            const pointA = [x1, y1].join(","); // 0,0 => 1,1
            const pointB = [x2, y1].join(","); // 2,0 => 3,1
            const pointC = [x2, y].join(","); // 2,1 => 3,2
            const pointD = [x1, y].join(","); // 0,1 => 1,2
            const pointE = [x1, y1].join(","); // 0,0 => 1,1

            const points = [pointA, pointB, pointC, pointD, pointE].join(", ");

            const point1 = [x1, y].join(","); // 0,1 => 1,2
            const point2 = [x1, y3].join(","); // 0,3 => 1,4
            const point3 = [x, y3].join(","); // 1,3 => 2,4
            const point4 = [x, y].join(","); // 1,1 => 2,2
            const point5 = [x1, y].join(","); // 0,1 => 1,2

            const points2 = [point1, point2, point3, point4, point5].join(", ");

            if (j) {
              console.log(points);
              console.log(points2);
            }

            d3.select(this)
              .append("polygon")
              .style("fill", "red")
              .style('stroke', 'grey')
              .style('stroke-width', 1)
              .style('stroke-opacity', 1)
              .attr("points", points)
              .attr("class", "quilt-triangle");
            console.log("polygon added");

            d3.select(this)
              .append("polygon")
              .style("fill", "green")
              .style('stroke', 'black')
              .style('stroke-width', 1)
              .style('stroke-opacity', 1)
              .attr("points", points2)
              .attr("class", "quilt-triangle");
            let temp = tileH;
            tileH = tileW;
            tileW = temp;
          }
        }
      });
  }

  drawX = () => {
    let i, ii;
    const id = "#" + this.tileA;
    const scale = 10;
    const width = 48;
    const height = 90;
    const tileHeight = 3;
    const tileWidth = 6;
    const rowHeight = 2;
    let offset = 0;
    let tileW = tileWidth;
    let tileH = tileHeight;
    d3.selectAll('#tiles')
      .select(id)
      .append("svg")
      .attr("class", "horizontal-line-quilt")
      .attr("width", width * scale)
      .attr("height", height * scale)
      .style("fill", "#ccc");

    d3.selectAll('.horizontal-line-quilt')
      .each(function (data, index) {
        // for (i = 0; i < height / tileHeight / rowHeight; i++) {
        for (i = 0; i < 1; i++) {
          for (ii = 0; ii < width / tileWidth; ii++) {
            console.log("width: ", tileW * scale, " height: ", tileH * scale);
            d3.select(this)
              .append("rect")
              .style("fill", "#fbfbfb")
              .style("fill-opacity", 0.1)
              .style('stroke', 'grey')
              .style('stroke-width', 1)
              .style('stroke-opacity', 1)
              .attr("class", "horizontal-quilt-row")
              .attr("x", (tileW * scale * ii) + offset)
              .attr("y", (tileH * scale * i))
              .attr("width", tileW * scale)
              .attr("height", tileW * scale);

            let temp = tileH;
            tileH = tileW;
            tileW = temp;
          }
          offset = i % 2 === 0 ? (tileWidth / 2) * scale : 0;
        }
      });
  }

  drawAngledData = () => {
    let i, ii;
    const id = "#" + this.tileA;
    const scale = 10;
    const width = 48;
    const height = 90;
    const tileHeight = 3;
    const tileWidth = 6;
    let offset = 0;
    d3.selectAll('#tiles')
      .select(id)
      .append("svg")
      .attr("class", "horizontal-line-quilt")
      .attr("width", width * scale)
      .attr("height", height * scale)
      .style("fill", "#ccc");

    d3.selectAll('.horizontal-line-quilt')
      .each(function (data, index) {
        const sizeW = tileWidth * scale;
        const sizeH = tileHeight * scale;
        console.log(sizeW, sizeH);

        console.log(height / tileHeight, width / tileWidth);

        for (let i = 0; i < width / tileWidth; i++) {
          const x = (i + 1) * sizeH; // 1
          const x1 = x - sizeH; // 0
          const x2 = (i + 2) * sizeH; // 2
          const x3 = (i + 3) * sizeH; // 3
          for (let j = 0; j < height / tileHeight; j++) {
            const y = (j + 1) * sizeH; // 1
            const y1 = y - sizeH; // 0 
            const y2 = (j + 2) * sizeH; // 2
            const y3 = (j + 3) * sizeH; // 3
            const pointA = [x1, y2].join(","); // 2, 0
            const pointB = [x2, y1].join(","); // 0, 2
            const pointC = [x3, y].join(","); // 1, 3
            const pointD = [x, y3].join(","); // 3, 1
            const pointE = [x1, y2].join(","); // 2, 0

            const points = [pointA, pointB, pointC, pointD, pointE].join(", ");

            console.log(x, x1, x2, x3, y, y1, y2, y3, points);

            d3.select(this)
              .append("polygon")
              .style("fill", "#fbfbfb")
              .style('stroke', 'grey')
              .style('stroke-width', 1)
              .style('stroke-opacity', 1)
              .attr("points", points)
              .attr("class", "quilt-triangle");
            console.log("polygon added");

          }
        }
      });
  }


  drawStraightTilesData = () => {
    let i, ii;
    const id = "#" + this.tileA;
    const scale = 10;
    const width = 48;
    const height = 90;
    const tileHeight = 3;
    const tileWidth = 6;
    d3.selectAll('#tiles')
      .select(id)
      .append("svg")
      .attr("class", "horizontal-line-quilt")
      .attr("width", width * scale)
      .attr("height", height * scale)
      .style("fill", "#ccc");

    d3.selectAll('.horizontal-line-quilt')
      .each(function (data, index) {
        for (i = 0; i < height / tileHeight; i++) {
          for (ii = 0; ii < width / tileWidth; ii++) {
            d3.select(this)
              .append("rect")
              .style("fill", "#fbfbfb")
              .style('stroke', 'grey')
              .style('stroke-width', 1)
              .style('stroke-opacity', 1)
              .attr("class", "horizontal-quilt-row")
              .attr("x", (tileWidth * scale * ii))
              .attr("y", (tileHeight * scale * i))
              .attr("width", tileWidth * scale)
              .attr("height", tileHeight * scale);
          }
        }
      });
  }

  drawStdSubwayTileData = () => {
    let i, ii;
    const id = "#" + this.tileA;
    const scale = 10;
    const width = 48;
    const height = 90;
    const tileHeight = 3;
    const tileWidth = 6;
    let offset = 0;
    d3.selectAll('#tiles')
      .select(id)
      .append("svg")
      .attr("class", "horizontal-line-quilt")
      .attr("width", width * scale)
      .attr("height", height * scale)
      .style("fill", "#ccc");

    d3.selectAll('.horizontal-line-quilt')
      .each(function (data, index) {
        for (i = 0; i < height / tileHeight; i++) {

          for (ii = 0; ii < width / tileWidth; ii++) {
            d3.select(this)
              .append("rect")
              .style("fill", "#fbfbfb")
              .style('stroke', 'grey')
              .style('stroke-width', 1)
              .style('stroke-opacity', 1)
              .attr("class", "horizontal-quilt-row")
              .attr("x", (tileWidth * scale * ii) + offset)
              .attr("y", (tileHeight * scale * i))
              .attr("width", tileWidth * scale)
              .attr("height", tileHeight * scale);
          }
          offset = i % 2 === 0 ? (tileWidth / 2) * scale : 0;
        }
      });
  }

}
