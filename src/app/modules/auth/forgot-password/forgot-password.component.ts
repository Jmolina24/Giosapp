import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
	selector: 'auth-forgot-password',
	templateUrl: './forgot-password.component.html',
	encapsulation: ViewEncapsulation.None,
	animations: fuseAnimations,
})
export class AuthForgotPasswordComponent implements OnInit {
	@ViewChild('forgotPasswordNgForm') forgotPasswordNgForm: NgForm;

	alert: { type: FuseAlertType; message: string } = {
		type: 'success',
		message: '',
	};
	forgotPasswordForm: FormGroup;
	showAlert: boolean = false;

	/**
	 * Constructor
	 */
	constructor(
		private _authService: AuthService,
		private _formBuilder: FormBuilder
	) {}

	// -----------------------------------------------------------------------------------------------------
	// @ Lifecycle hooks
	// -----------------------------------------------------------------------------------------------------

	/**
	 * On init
	 */
	ngOnInit(): void {
		// Create the form
		this.forgotPasswordForm = this._formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
		});
	}

	// -----------------------------------------------------------------------------------------------------
	// @ Public methods
	// -----------------------------------------------------------------------------------------------------

	/**
	 * Send the reset link
	 */
	sendResetLink(): void {
		// Return if the form is invalid
		if (this.forgotPasswordForm.invalid) {
			return;
		}

		// Disable the form
		this.forgotPasswordForm.disable();

		// Hide the alert
		this.showAlert = false;

		// Forgot password
		this._authService
			.recoveryPassword({ correo: this.forgotPasswordForm.value.email })
			.then((response) => {
				if (response.hasOwnProperty('errors')) {
					this.forgotPasswordForm.enable();

					// Set the alert
					this.alert = {
						type: 'error',
						message: 'Datos erroneos: ' + response.errors
							.map((element: any) => element.param)
							.join(', '),
					};

					this.showAlert = true;
					return;
				}

				if (response.hasOwnProperty('error')) {
					this.forgotPasswordForm.enable();

					// Set the alert
					this.alert = {
						type: 'error',
						message: 'Error',
					};

					this.showAlert = true;
					return;
				}

				if (response?.codigo == 1) {
					this.forgotPasswordForm.enable();

					// Set the alert
					this.alert = {
						type: 'error',
						message: response.mensaje,
					};

					this.showAlert = true;
					return;
				}

				if (response?.codigo == 0) {
					this.forgotPasswordForm.enable();

					// Set the alert
					this.alert = {
						type: 'success',
						message: response.mensaje || 'Correo enviado',
					};

					this.showAlert = true;
					return;
				}

			}).catch((response) => {
				this.forgotPasswordForm.enable();

				this.alert = {
					type: 'error',
					message: response?.mensaje || 'Error'
				};

				this.showAlert = true;
				return;
			});
	}
}
