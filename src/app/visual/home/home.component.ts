import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'geo-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public intervalX: number = 12;
  public intervalY: number = 10;
  public gridSize: number = 30;
  public addSubgrid: boolean = false;

  public title = 'geo-app';
  
  constructor() { }

  ngOnInit(): void {
  }

}
