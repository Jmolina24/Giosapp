/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { GeneralService } from 'app/core/api/general.service';
import { SweetAlertService } from 'app/core/helpers/sweet-alert.service';

@Component({
	selector: 'auth-sign-up',
	templateUrl: './sign-up.component.html',
	encapsulation: ViewEncapsulation.None,
	animations: fuseAnimations,
})
export class AuthSignUpComponent implements OnInit {
	@ViewChild('signUpNgForm') signUpNgForm: NgForm;

	alert: { type: FuseAlertType; message: string } = {
		type: 'success',
		message: '',
	};

	isAcceptTerms = false;

	isLoading: boolean = false;
	signUpForm: FormGroup;
	showAlert: boolean = false;

	listPlan: any[] = [];
	listGenres: any[] = [];
	listTypesDocuments: any[] = [];

	data = {
		primer_nombre: '',
		segundo_nombre: '',
		primer_apellido: '',
		segundo_apellido: '',
		fecha_nacimiento: '',
		tipo_documento: '',
		num_documento: '',
		email: '',
		telefono: '',
		genero: '',
		password: '',
		repeatPassword: '',
		plan_id: '',
		peso: '',
		estatura: '',
		talla_cintura: '',
		talla_cadera: '',
	};

	formData: FormData = new FormData();
	files: { name: string; file: File; allInfo?: any }[] = [];
	/**
	 * Constructor
	 */
	constructor(
		private _authService: AuthService,
		private _geneService: GeneralService,
		private _formBuilder: FormBuilder,
		private _router: Router,
		private _alert: SweetAlertService
	) {}

	// -----------------------------------------------------------------------------------------------------
	// @ Lifecycle hooks
	// -----------------------------------------------------------------------------------------------------

	/**
	 * On init
	 */
	ngOnInit(): void {
		this.getAllPlan();
		this.getGenres();
		this.getTypesDocuments();
	}

	async signUp(): Promise<void> {
		if (!this.isAcceptTerms) {
			this.fnShowAlert(
				{ type: 'info', message: 'Acepte los terminos y condiciones.' },
				() => {}
			);
			return;
		}

		if (
			this.files.some(
				(element: { name: string; file: File }) => !element.file
			)
		) {
			this.fnShowAlert(
				{ type: 'error', message: 'Error al cargar las imagenes.' },
				() => {}
			);
			return;
		}

		if (this.files.length !== 3) {
			this.fnShowAlert(
				{ type: 'error', message: 'Ingrese las imagenes requeridas.' },
				() => {}
			);
			return;
		}
		this.isLoading = true;

		if (this.data.password !== this.data.repeatPassword) {
			this.fnShowAlert(
				{
					type: 'error',
					message: 'Las contraseñas no son iguales.',
				},
				() => {}
			);
			this.isLoading = false;
			return;
		}

		const { codigo, rutas, ...response } = await this._geneService
			.uploadFile(this.formData)
			.catch((response) => {
				this.fnShowAlert(
					{
						type: 'error',
						message: 'Error al cargar las imagenes.',
					},
					() => {}
				);
				this.isLoading = false;
				return;
			});

		if (codigo !== 0 || response.hasOwnProperty('errors')) {
			this.fnShowAlert(
				{
					type: 'error',
					message:
						response.mensaje || 'Error al ingresar las imagenes.',
				},
				() => {}
			);
			this.isLoading = false;
			return;
		}

		this.files.forEach((element: any, index: number) => {
			element.allInfo = rutas[index];
			this.data[element.name] = rutas[index].path;
		});

		this._authService.signUp(this.data).then((response: any) => {
			if (response.hasOwnProperty('errors')) {
				this.fnShowAlert(
					{
						type: 'error',
						message:
							'Datos erroneos: ' +
							response.errors
								.map((element: any) => element.param)
								.join(', '),
					},
					() => {
						this.isLoading = false;
					}
				);
			} else if (response.hasOwnProperty('codigo')) {
				this.isLoading = false;
				if (response.codigo === 0) {
					this._alert
						.confirm({
							titleText: '¡Bienvenido!',
							text: 'Su registro se realizó correctamente. Lo redireccionaremos automáticamente para que inicie sesión con su correo y clave.',
						})
						.then((response) => {
							if (!response.isConfirmed) {
								return;
							}
							this._router.navigate(['/sign-in']);
						});
				} else {
					this.fnShowAlert(
						response.codigo === 0
							? {
									type: 'success',
									message: 'Usuario creado correctamente',
							  }
							: { type: 'info', message: response.mensaje },
						() => {
							if (response.codigo === 0) {
								this._router.navigate(['/sign-in']);
							}
						}
					);
				}
			}
		});
	}

	getAllPlan(): void {
		this._geneService
			.getPlanByKey()
			.then((response: any) => (this.listPlan = response));
	}

	getGenres(): void {
		this._geneService
			.getGenres()
			.then((response: any) => (this.listGenres = response));
	}

	getTypesDocuments(): void {
		this._geneService
			.getTypesDocuments()
			.then((response: any) => (this.listTypesDocuments = response));
	}

	fnShowAlert(
		content: { type: FuseAlertType; message: string },
		callback?: () => any,
		duration: number = 2500
	): void {
		this.alert = content;
		this.showAlert = true;

		setTimeout(() => {
			this.showAlert = false;
			callback();
		}, duration);
	}

	fnUploadFile(file: File, key: string): void {
		if (!file) {
			return;
		}

		this.files.push({ file: file[0], name: key });
		this.formData.append('files', file[0]);
	}

	fnBtnModal(): void {
		const modal = document.getElementById('modalTermsAndConditions');

		modal.classList.toggle('hidden');
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
