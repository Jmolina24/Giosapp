/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { StorageService } from 'app/core/helpers/storage.service';
import { SweetAlertService } from 'app/core/helpers/sweet-alert.service';

@Component({
	selector: 'app-reset-password',
	templateUrl: './reset-password.component.html',
	encapsulation: ViewEncapsulation.None,
	animations: fuseAnimations,
})
export class ResetPasswordComponent implements OnInit {
	@ViewChild('resetPasswordNgForm') resetPasswordNgForm: NgForm;

	alert: { type: FuseAlertType; message: string } = {
		type: 'success',
		message: '',
	};
	resetPasswordForm: FormGroup;
	showAlert: boolean = false;

	constructor(
		private _formBuilder: FormBuilder,
		private _authService: AuthService,
		private _router: Router,
		private _storage: StorageService,
		private _alert: SweetAlertService
	) { }

	ngOnInit(): void {
		this.resetPasswordForm = this._formBuilder.group({
			newPassword: ['', Validators.required],
		});
	}

	resetPassword(): void {
		if (this.resetPasswordForm.invalid) {
			return;
		}
		this.resetPasswordForm.disable();
		this.showAlert = false;

		this._authService
			.changePassword({ user_id: Number(this._storage.getUserId()), clave_nueva: this.resetPasswordForm.get('newPassword').value })
			.then((response) => {
				if (response.hasOwnProperty('errors')) {
					if (!this.fnLength(this.resetPasswordForm.get('newPassword').value) || !this.fnOneNumber(this.resetPasswordForm.get('newPassword').value)
					|| !this.fnSpecialCharacter(this.resetPasswordForm.get('newPassword').value)) {
						this.alert = {
							type: 'error',
							message: 'Ingrese una contraseña que cumpla con las especificaciones',
						};
					}
				}
				if ( response.codigo === 1){
					this.alert = {
						type: response.codigo === 0 ? 'success' : 'error',
						message: response.mensaje,
					};
				}

				if (response.codigo === 0) {
					this.alert = {
						type: response.codigo === 0 ? 'success' : 'error',
						message: response.mensaje,
					};
					this.showAlert = true;

					this._alert
						.confirm({
							titleText: '¡Cambio realizado!',
							text: response.mensaje || 'Su cambio de clave fue realizado con exito, se le regresara a la apartado del login para que inicie sesión.',
						})
						.then((responseAlert) => {
							if (!responseAlert.isConfirmed) {
								return;
							}
							this._router.navigate(['/sign-in']);
						});
					return;
				}

				this.resetPasswordForm.enable();
				this.resetPasswordNgForm.resetForm();
				this.showAlert = true;

			}).catch((response) => {
				this.resetPasswordForm.enable();

				this.resetPasswordNgForm.resetForm();

				this.alert = {
					type: 'error',
					message: response.mensaje
				};

				this.showAlert = true;
				return;
			});
	}

	fnLength(content: string): boolean{
		return content.length >= 8 && content.length <= 15;
	}

	fnOneNumber(content: string): boolean {
		return RegExp(/(\d)+/g).exec(content) !== null;
	}

	fnSpecialCharacter(content: string): boolean {
		return RegExp(/([!@#$%^&*(),.?":{}|<>])+/g).exec(content) !== null;
	}
}
