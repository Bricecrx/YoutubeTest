import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainpageComponent } from './mainpage/mainpage.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes =
  [
    { path: '', redirectTo: 'mainpage', pathMatch: 'full' },
    { path: 'mainpage', component: MainpageComponent }
  ];



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
