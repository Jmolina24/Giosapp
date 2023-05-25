import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SweetAlertService } from 'app/core/helpers/sweet-alert.service';
import { ClientsService } from 'app/core/services/clients.service';
import { GeneralService } from 'app/core/services/general.service';

@Component({
	selector: 'app-detail-site',
	templateUrl: './detail-site.component.html',
	styleUrls: ['./detail-site.component.scss'],
})
export class DetailSiteComponent implements OnInit {
	info: any = {};

	list: any[] = [];

	listDeptos: any[] = [];
	listCities: any[] = [];

	iddepartamento: string = '';
	idCiudad: string = '';

	idcliente: string = '0';

	data: any = null;

	section: 'add' | 'edit' | null;

	listClients: any[] = [];

	constructor(
		private _service: ClientsService,
		private _general: GeneralService,
		private route: ActivatedRoute,
		private _alert: SweetAlertService
	) {}

	ngOnInit(): void {
		this.route.params.subscribe((params) => {
			this.idcliente = params['id'];
			if (!this.idcliente) {
				return;
			}

			this.get(this.idcliente);

			this.getBySite(this.idcliente);

			this.getDeptos();

			this.getAll();
		});
	}

	get(idcliente: string = '0'): void {
		this._service.get({ idcliente }).subscribe((response) => {
			if (!response) {
				return;
			}

			this.info = response[0];
		});
	}

	getBySite(idcliente: string = '0', idciudad: string = '0'): void {
		this._service
			.bySite({ idcliente, idciudad })
			.subscribe((response: any) => {
				this.list = response;
			});
	}

	getAll(): void {
		this._service.get().subscribe((response) => {
			if (!response) {
				return;
			}

			this.listClients = response;
		});
	}

	getDeptos(): void {
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

	create(): void {
		this._alert.loading();

		this.data['nombre'] = this.data.cliensede;

		this._service
			.createSede({ idclientesede: '0', ...this.data })
			.subscribe(
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

					this.getBySite(this.idcliente);
				},
				(error) => {
					this._alert.error({
						title: error.titulo || 'Error',
						text:
							error.mensaje || 'Error al procesar la solicitud.',
					});
				}
			);
	}

	update(): void {
		this._alert.loading();

		this.data['nombre'] = this.data.cliensede;

		this._service.createSede(this.data).subscribe(
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
				this.getBySite(this.idcliente);
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
				idcliente: '',
				idtiposede: '',
				idciudad: '',
				nombre: '',
				codigocosto: '',
				direccion: '',
				telefono: '',
				email: '',
				contacto: '',
				barrio: '',
			};
			return;
		}

		this.data = data;
		console.log(data);
	}
}
