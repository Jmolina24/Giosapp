import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'app/layout/layout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { NoAuthGuard } from './core/guards/no-auth.guard';

const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'dashboard/home' },
	{
		path: 'auth',
		data: {
			layout: 'empty',
		},
		component: LayoutComponent,
		children: [
			{
				path: '',
				loadChildren: (): any =>
					import('app/pages/auth/auth.module').then(
						(m: any) => m.AuthModule
					),
			},
		],
		canActivate: [NoAuthGuard],
	},
	{
		path: 'dashboard',
		component: LayoutComponent,
		children: [
			{
				path: '',
				loadChildren: (): any =>
					import('app/pages/main/main.module').then(
						(m: any) => m.MainModule
					),
			},
		],
		canActivate: [AuthGuard],
	},
	{
		path: 'others',
		component: LayoutComponent,
		data: {
			layout: 'empty',
		},
		children: [
			{
				path: '',
				loadChildren: (): any =>
					import('app/pages/others/others.module').then(
						(m: any) => m.OthersModule
					),
			},
		],
		canActivate: [AuthGuard],
	},
	{ path: '**', redirectTo: 'others/404-not-found' },
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {
			useHash: true,
			preloadingStrategy: PreloadAllModules,
		}),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {}
