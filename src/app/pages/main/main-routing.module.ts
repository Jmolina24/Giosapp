import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignedServicesComponent } from 'app/modules/main/assigned-services/assigned-services.component';
import { HomeComponent } from 'app/modules/main/home/home.component';
import { ParameterSettingComponent } from 'app/modules/main/parameter-setting/parameter-setting.component';
import { RolesComponent } from 'app/modules/main/roles/roles.component';
import { ServicesComponent } from 'app/modules/main/services/services.component';
import { ThirdPartiesComponent } from 'app/modules/main/third-parties/third-parties.component';
import { UsersComponent } from 'app/modules/main/users/users.component';

const routes: Routes = [
	{
		path: 'home',
		component: HomeComponent
	},
	{
		path: 'users',
		component: UsersComponent
	},
	{
		path: 'clients',
		children: [
			{
				path: '',
				loadChildren: (): any => import('app/modules/main/clients/clients.module').then((m: any) => m.ClientsModule),
			}
		]
	},
	{
		path: 'roles',
		component: RolesComponent
	},
	{
		path: 'orders',
		children: [
			{
				path: '',
				loadChildren: (): any => import('app/modules/main/orders/orders.module').then((m: any) => m.OrdersModule),
			}
		]
	},
	{
		path: 'services',
		component: ServicesComponent
	},
	{
		path: 'third-parties',
		component: ThirdPartiesComponent
	},
	{
		path: 'parameter-setting',
		component: ParameterSettingComponent
	},
	{
		path: 'assigned-services',
		component: AssignedServicesComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class MainRoutingModule { }
