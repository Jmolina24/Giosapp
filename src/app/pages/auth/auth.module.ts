import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthForgotPasswordComponent } from 'app/modules/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from 'app/modules/auth/reset-password/reset-password.component';
import { AuthSignInComponent } from 'app/modules/auth/sign-in/sign-in.component';
import { AuthSignOutComponent } from 'app/modules/auth/sign-out/sign-out.component';
import { AuthSignUpComponent } from 'app/modules/auth/sign-up/sign-up.component';

import { AuthRoutingModule } from './auth-routing.module';

import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { FuseCardModule } from '@fuse/components/card';
import { FuseAlertModule } from '@fuse/components/alert';

import { SharedModule } from 'app/shared/shared.module';


@NgModule({
	declarations: [AuthForgotPasswordComponent, ResetPasswordComponent, AuthSignInComponent, AuthSignOutComponent, AuthSignUpComponent],
	imports: [
		CommonModule,
		AuthRoutingModule,
		MatButtonModule,
		MatFormFieldModule,
		MatIconModule,
		MatInputModule,
		MatProgressSpinnerModule,
		FuseCardModule,
		FuseAlertModule,
		SharedModule,
		MatSelectModule,
		MatTooltipModule,
	]
})
export class AuthModule { }
