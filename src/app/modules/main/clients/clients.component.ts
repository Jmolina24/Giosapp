import { Component, OnInit } from '@angular/core';
import { SweetAlertService } from 'app/core/helpers/sweet-alert.service';
import { ClientsService } from 'app/core/services/clients.service';
import { GeneralService } from 'app/core/services/general.service';

@Component({
	selector: 'app-clients',
	templateUrl: './clients.component.html',
	styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit {
	list: any[] = [];

	data: any = null;

	section: 'add' | 'edit' | null;

	listTypesDocuments: any[] = [];

	constructor(
		private _service: ClientsService,
		private _alert: SweetAlertService,
		private _general: GeneralService
	) {}

	ngOnInit(): void {
		this.get();
		this.getSelects();
	}

	get(): void {
		this._service.get().subscribe((response: any) => {
			if (!response) {
				return;
			}

			this.list = response;
		});
	}

	getSelects(): void {
		this._general.getTypesDocuments().subscribe((response) => {
			if (!response) {
				return;
			}

			this.listTypesDocuments = response;
		});
	}

	create(): void {
		this._alert.loading();

		this._service.create({ idcliente: '0', ...this.data}).subscribe(
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
}
