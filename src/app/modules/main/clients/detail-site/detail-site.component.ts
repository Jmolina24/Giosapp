import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SweetAlertService } from 'app/core/helpers/sweet-alert.service';
import { ClientsService } from 'app/core/services/clients.service';
import { GeneralService } from 'app/core/services/general.service';
import { Subject } from 'rxjs';

@Component({
	selector: 'app-detail-site',
	templateUrl: './detail-site.component.html',
	styleUrls: ['./detail-site.component.scss'],
})
export class DetailSiteComponent implements OnInit {
	info: any = {};

	list: any[] = [];
	listCopy: any[] = [];

	listDeptos: any[] = [];
	listCities: any[] = [];
	listTypes: any[] = [];

	iddepartamento: string = '';
	idCiudad: string = '';

	idcliente: string = '0';

	data: any = null;

	section: 'add' | 'edit' | null;

	listClients: any[] = [];

	searchTerm$ = new Subject<string>();

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

			this.search();

			this.getTypes();
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
				this.listCopy = JSON.parse(JSON.stringify(response));
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

	getTypes(): void {
		this._service.getTypesSedes().subscribe((response: any) => {
			this.listTypes = response;
		});
	}

	getDeptos(): void {
		this._general.getDeptos().subscribe((response: any) => {
			this.listDeptos = response;
		});
	}

	getCities(iddepartamento: string): void {
		if (iddepartamento === '0') {
			this.getBySite(this.idcliente, '0');
			return;
		}
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
					this.showSection(null);
				},
				({ error }) => {
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
				this.showSection(null);
			},
			({ error }) => {
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
				idcliente: Number(this.idcliente),
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

			console.log(this.data, this.idcliente);
			return;
		}

		this.data = JSON.parse(JSON.stringify(data));

		this.getCities(this.data.iddepartamento);
	}

	search(): void {
		this.searchTerm$.subscribe((term) => {
			this.list = this.listCopy.filter(
				(item: any) =>
					item.cliensede.toLowerCase().indexOf(term.toLowerCase()) >= 0
			);
		});
	}
}
