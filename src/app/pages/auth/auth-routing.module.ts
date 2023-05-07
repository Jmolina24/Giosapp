import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthForgotPasswordComponent } from 'app/modules/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from 'app/modules/auth/reset-password/reset-password.component';
import { AuthSignInComponent } from 'app/modules/auth/sign-in/sign-in.component';
import { AuthSignOutComponent } from 'app/modules/auth/sign-out/sign-out.component';
import { AuthSignUpComponent } from 'app/modules/auth/sign-up/sign-up.component';

const routes: Routes = [
	{
		path: 'forgot-password',
		component: AuthForgotPasswordComponent
	},
	{
		path: 'reset-password',
		component: ResetPasswordComponent
	},
	{
		path: 'sign-in',
		component: AuthSignInComponent
	},
	{
		path: 'sign-up',
		component: AuthSignUpComponent
	},
	{
		path: 'sign-out',
		component: AuthSignOutComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
