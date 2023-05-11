import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { StorageService } from 'app/core/helpers/storage.service';

@Component({
	selector: 'auth-sign-in',
	templateUrl: './sign-in.component.html',
	encapsulation: ViewEncapsulation.None,
	animations: fuseAnimations,
})
export class AuthSignInComponent implements OnInit {
	@ViewChild('signInNgForm') signInNgForm: NgForm;

	alert: { type: FuseAlertType; message: string } = {
		type: 'success',
		message: '',
	};
	signInForm: FormGroup;
	showAlert: boolean = false;

	constructor(
		private _authService: AuthService,
		private _formBuilder: FormBuilder,
		private _router: Router,
		private _storage: StorageService
	) {}

	ngOnInit(): void {
		this.signInForm = this._formBuilder.group({
			username: ['', [Validators.required]],
			password: ['', Validators.required],
		});
	}

	signIn(): void {
		if (this.signInForm.invalid) {
			return;
		}

		this.signInForm.disable();

		// Hide the alert
		this.showAlert = false;

		// Sign in
		const { username, password } = this.signInForm.value;
		this._authService
			.signIn({ usuario: username, password })
			.then((response) => {
				if (response.hasOwnProperty('errors')) {
					switch (response.errors[0].param) {
						case 'usuario':
							this.signInForm.enable();
							this.alert = {
								type: 'error',
								message: 'Usuario invalido',
							};

							this.showAlert = true;
							break;
						case 'password':
							this.signInForm.enable();
							this.alert = {
								type: 'error',
								message: 'Contraseña invalido',
							};

							this.showAlert = true;
							break;
					}

					return;
				}

				this.alert = {
					type: response.codigo === 0 ? 'success' : 'error',
					message: response.mensaje,
				};
				this.showAlert = true;
				this.signInForm.enable();
				// this.signInNgForm.resetForm();
				if (response.codigo === 0) {
					this._storage.saveToken(response.token);
					this._storage.saveUserId(response.user_id);

					if (response.temporal) {
						this.alert = {
							type: response.codigo === 0 ? 'success' : 'error',
							message: 'Restablecimiento de contraseña.',
						};
						this.showAlert = true;
						this._storage.saveIsTemporal(true);
						this._router.navigate(['/reset-password']);
						return;
					}

					if (this._storage.getUserId()) {
						this._storage.saveRolId(response.rol);
						switch (response.rol) {
							case 1:
								this._router.navigate(['/dashboard/admin/review']);
								break;
							case 2:
								this._router.navigate(['/dashboard/user/profile']);
								break;
							default:
								this._router.navigate(['/dashboard/user/profile']);
								break;
						}
					}
				}
			});
	}
}
