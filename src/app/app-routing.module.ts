import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsoroboComponent } from './isorobo/isorobo.component';

const routes: Routes = [
  {path:'isorobo',component:IsoroboComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

