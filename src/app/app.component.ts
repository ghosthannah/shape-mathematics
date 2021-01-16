import { Component } from '@angular/core';

@Component({
  selector: 'geo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public intervalX: number = 12;
  public intervalY: number = 10;
  public gridSize: number = 30;
  public addSubgrid: boolean = false;

  public title = 'geo-app';
}
