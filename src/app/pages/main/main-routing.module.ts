import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from 'app/modules/main/clients/clients.component';
import { HomeComponent } from 'app/modules/main/home/home.component';
import { RolesComponent } from 'app/modules/main/roles/roles.component';
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
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
