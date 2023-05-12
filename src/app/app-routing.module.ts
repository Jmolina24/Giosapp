import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'app/layout/layout.component';

const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'dashboard' },
	{
		path: 'auth',
		data: {
			layout: 'empty',
		},
		component: LayoutComponent,
		children: [
			{
				path: '',
				loadChildren: (): any => import('app/pages/auth/auth.module').then((m: any) => m.AuthModule)
			}
		]
	},
	{
		path: 'dashboard',
		component: LayoutComponent,
		children: [
			{
				path: '',
				loadChildren: (): any => import('app/pages/main/main.module').then((m: any) => m.MainModule),
			}
		]
	},
	{
		path: 'others',
		component: LayoutComponent,
		data: {
			layout: 'empty'
		},
		children: [
			{
				path: '',
				loadChildren: (): any => import('app/pages/others/others.module').then((m: any) => m.OthersModule),
			}
		]
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
export class AppRoutingModule { }
