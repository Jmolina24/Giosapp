import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthSignInComponent } from 'app/modules/auth/sign-in/sign-in.component';
import { AuthSignOutComponent } from 'app/modules/auth/sign-out/sign-out.component';

const routes: Routes = [
	{
		path: 'iniciar-sesion',
		component: AuthSignInComponent
	},
	{
		path: 'cerrar-sesion',
		component: AuthSignOutComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
