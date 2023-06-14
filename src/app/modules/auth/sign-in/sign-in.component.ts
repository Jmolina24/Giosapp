import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/services/auth.service';
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

		this.showAlert = false;

		const { username, password } = this.signInForm.value;

		this._authService.signIn({ username, password }).subscribe(
			(response: any) => {
				this.alert = {
					type: response.codigo === 0 ? 'success' : 'error',
					message: response.mensaje,
				};

				if (response.codigo !== 0) {
					return;
				}
				// this.signInNgForm.resetForm();
				if (response.codigo === 0) {
					const { token, id, idrol, ...user } = response;

					this._storage.saveToken(token);
					this._storage.saveUser(user);
					this._storage.saveUserId(id);
					this._storage.saveRolId(idrol);

					if (this._storage.getUserId()) {
						this._router.navigate(['/panel/inicio']);
					}
				}
			},
			({ error }: HttpErrorResponse) => {
				this.alert = {
					type: 'error',
					message: error.mensaje,
				};

				this.showAlert = true;
				this.signInForm.enable();
			},
			() => {
				this.showAlert = true;
				this.signInForm.enable();
			}
		);
	}
}
