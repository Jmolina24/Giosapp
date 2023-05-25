/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { SweetAlertService } from 'app/core/helpers/sweet-alert.service';
import { GeneralService } from 'app/core/services/general.service';
import { ServicesService } from 'app/core/services/services.service';

@Component({
	selector: 'app-services',
	templateUrl: './services.component.html',
	styleUrls: ['./services.component.scss'],
})
export class ServicesComponent implements OnInit {
	list: any[] = [];

	data: any = null;

	section: 'add' | 'edit' | null;

	listUnits: any[] = [];
	listTypesServices: any[] = [];

	constructor(
		private _service: ServicesService,
		private _alert: SweetAlertService,
		private _general: GeneralService
	) {}

	ngOnInit(): void {
		this.get();
		this.getSelects();
	}

	get(): void {
		this._service.get().subscribe((response) => {
			if (!response) {
				return;
			}

			this.list = response;
		});
	}

	create(): void {
		this._alert.loading();

		this.data['idunidad'] = this.data.cliensede;
		this._service.create({ idservicio: '0', ...this.data }).subscribe(
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

		this.data['idunidad'] = this.data.idunidad_medida;
		this._service.create(this.data).subscribe(
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

	changeStatus({ idservicio }, status: 'A' | 'I'): void {
		this._alert.loading();

		this._service.changeStatus(idservicio, status).subscribe(
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
				idservicio: '',
				idtiposervicio: '',
				idunidad_medida: '',
				codigo: '',
				nombre: '',
				descripcion: '',
			};
			return;
		}

		this.data = data;
	}

	getSelects(): void {
		this._general.getMeasuringUnits().subscribe((response) => {
			if (!response) {
				return;
			}

			this.listUnits = response;
		});

		this._service.getTypes().subscribe((response) => {
			if (!response) {
				return;
			}

			this.listTypesServices = response;
		});
	}
}
