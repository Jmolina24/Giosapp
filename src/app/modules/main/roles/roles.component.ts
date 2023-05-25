import { Component, OnInit } from '@angular/core';
import { SweetAlertService } from 'app/core/helpers/sweet-alert.service';
import { RolesService } from 'app/core/services/roles.service';

@Component({
	selector: 'app-roles',
	templateUrl: './roles.component.html',
	styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit {
	list: any[] = [];

	data: any = null;

	section: 'add' | 'edit' | null;

	constructor(
		private _service: RolesService,
		private _alert: SweetAlertService
	) {}

	ngOnInit(): void {
		this.get();
	}

	get(): void {
		this._service.get().subscribe((response) => {
			this.list = response;
		});
	}

	create(): void {
		this._alert.loading();

		this._service.create({ idrol: '0', ...this.data }).subscribe(
			(response) => {
				this._alert.closeAlert();
				if (response.codigo !== 0) {
					this._alert.error({
						title: response.titulo,
						text: response.mensaje,
					});
					return;
				}

				this._alert.success({
					title: response.titulo,
					text: response.mensaje,
				});

				this.get();
			},
			(error) => {
				this._alert.error({
					title: error.titulo || 'Error',
					text: error.mensaje || 'Error al procesar la solicitud.',
				});
			}
		);
	}

	update(): void {
		this._alert.loading();

		this._service.create({ idrol: '0', ...this.data }).subscribe(
			(response) => {
				this._alert.closeAlert();
				if (response.codigo !== 0) {
					this._alert.error({
						title: response.titulo,
						text: response.mensaje,
					});
					return;
				}

				this._alert.success({
					title: response.titulo,
					text: response.mensaje,
				});
				this.get();
			},
			(error) => {
				this._alert.error({
					title: error.titulo || 'Error',
					text: error.mensaje || 'Error al procesar la solicitud.',
				});
			}
		);
	}

	showSection(section: 'add' | 'edit', data = null): void {
		this.section = section;

		if (!data) {
			this.data = {
				nombre: '',
				tipo: '',
				menu: '[]',
				crear: '',
				editar: '',
				detalle: '',
				ver: '',
				modificarestado: '',
				estado: '',
			};
			return;
		}

		this.data = data;
	}

	changeStatus({ idrol }, status: 'A' | 'I'): void {
		this._alert.loading();

		this._service.changeStatus(idrol, status).subscribe(
			(response) => {
				this._alert.closeAlert();
				if (response.codigo !== 0) {
					this._alert.error({
						title: response.titulo,
						text: response.mensaje,
					});
					return;
				}

				this._alert.success({
					title: response.titulo,
					text: response.mensaje,
				});

				this.get();
			},
			(error) => {
				this._alert.error({
					title: error.titulo || 'Error',
					text: error.mensaje || 'Error al procesar la solicitud.',
				});
			}
		);
	}
}
