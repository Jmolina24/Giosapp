import { Component, OnInit } from '@angular/core';
import { SweetAlertService } from 'app/core/helpers/sweet-alert.service';
import { GeneralService } from 'app/core/services/general.service';
import { ThirdPartiesService } from 'app/core/services/third-parties.service';

@Component({
	selector: 'app-third-parties',
	templateUrl: './third-parties.component.html',
	styleUrls: ['./third-parties.component.scss'],
})
export class ThirdPartiesComponent implements OnInit {
	list: any[] = [];

	data: any = null;

	section: 'add' | 'edit' | null;

	listTypesDocuments: any[] = [];
	listDeptos: any[] = [];
	listCities: any[] = [];

	constructor(
		private _service: ThirdPartiesService,
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

		this._service.create({ idtercero: '0', ...this.data }).subscribe(
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

	changeStatus({ idtercero }, status: 'A' | 'I'): void {
		this._alert.loading();

		this._service.changeStatus(idtercero, status).subscribe(
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
				idtipodocumento: '',
				razonsocial: '',
				numerodocumento: '',
			};
			return;
		}

		this.data = data;
	}

	getSelects(): void {
		this._general.getTypesDocuments().subscribe((response) => {
			if (!response) {
				return;
			}

			this.listTypesDocuments = response;
		});
		this._general.getDeptos().subscribe((response: any) => {
			this.listDeptos = response;
		});
	}

	getCities(iddepartamento: string): void {
		this._general
			.getCities({ iddepartamento })
			.subscribe((response: any) => {
				this.listCities = response;
			});
	}
}
