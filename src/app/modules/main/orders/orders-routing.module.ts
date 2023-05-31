import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
	{
		path: '',
		component: OrdersComponent
	},
	{
		path: 'detail/:id',
		component: DetailsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class OrdersRoutingModule {}
