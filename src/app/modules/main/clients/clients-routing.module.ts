import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './clients.component';
import { DetailSiteComponent } from './detail-site/detail-site.component';

const routes: Routes = [
	{
		path: '',
		component: ClientsComponent
	},
	{
		path: 'site/:id',
		component: DetailSiteComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
