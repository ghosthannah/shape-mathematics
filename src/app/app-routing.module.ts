import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GridComponent } from './visual/grid/grid.component';
import { HomeComponent } from './visual/home/home.component';
import { TilesComponent } from './visual/tiles/tiles.component';

const routes: Routes = [
  { path: "tiles", component: TilesComponent },
  { path: "grid", component: HomeComponent },
  { path: "", redirectTo: '/grid', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
