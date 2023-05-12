import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from 'app/modules/others/error-404/error-404.component';

const routes: Routes = [
	{
		path: '404-not-found',
		component: Error404Component
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OthersRoutingModule { }
