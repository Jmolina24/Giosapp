import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignedServicesComponent } from 'app/modules/main/assigned-services/assigned-services.component';
import { DetailFileComponent } from 'app/modules/main/detail-file/detail-file.component';
import { HomeComponent } from 'app/modules/main/home/home.component';
import { ParameterSettingComponent } from 'app/modules/main/parameter-setting/parameter-setting.component';
import { RatesComponent } from 'app/modules/main/rates/rates.component';
import { ReportComponent } from 'app/modules/main/report/report.component';
import { RolesComponent } from 'app/modules/main/roles/roles.component';
import { ServicesComponent } from 'app/modules/main/services/services.component';
import { ThirdPartiesComponent } from 'app/modules/main/third-parties/third-parties.component';
import { UsersComponent } from 'app/modules/main/users/users.component';

const routes: Routes = [
	{
		path: 'inicio',
		component: HomeComponent,
	},
	{
		path: 'usuarios',
		component: UsersComponent,
	},
	{
		path: 'clientes',
		children: [
			{
				path: '',
				loadChildren: (): any =>
					import('app/modules/main/clients/clients.module').then(
						(m: any) => m.ClientsModule
					),
			},
		],
	},
	{
		path: 'roles',
		component: RolesComponent,
	},
	{
		path: 'ordenes',
		children: [
			{
				path: '',
				loadChildren: (): any =>
					import('app/modules/main/orders/orders.module').then(
						(m: any) => m.OrdersModule
					),
			},
		],
	},
	{
		path: 'servicios',
		component: ServicesComponent,
	},
	{
		path: 'terceros',
		component: ThirdPartiesComponent,
	},
	{
		path: 'parametrizacion',
		component: ParameterSettingComponent,
	},
	{
		path: 'servicios-asignados',
		component: AssignedServicesComponent,
	},
	{
		path: 'tarifarios',
		component: RatesComponent,
	},
	{
		path: 'archivo-detalle/:iddetalleorden/:iddetalleordensoporte',
		component: DetailFileComponent,
	},
	{
		path: 'reporte',
		children: [
			{
				path: 'servicios_generados',
				component: ReportComponent
			}
		]
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class MainRoutingModule {}
