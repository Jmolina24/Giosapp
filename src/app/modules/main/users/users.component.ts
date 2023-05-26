import { Component, OnInit } from '@angular/core';
import { SweetAlertService } from 'app/core/helpers/sweet-alert.service';
import { ClientsService } from 'app/core/services/clients.service';
import { GeneralService } from 'app/core/services/general.service';
import { RolesService } from 'app/core/services/roles.service';
import { ThirdPartiesService } from 'app/core/services/third-parties.service';
import { UsersService } from 'app/core/services/users.service';
import { Subject } from 'rxjs';

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
	list: any[] = [];
	listCopy: any[] = [];

	listRoles: any[] = [];
	listCustomers: any[] = [];
	listSites: any[] = [];
	listThirdsParties: any[] = [];
	listDocumentsTypes: any[] = [];

	data: any = null;

	section: 'add' | 'edit' | null;

	searchTerm$ = new Subject<string>();

	constructor(
		private _service: UsersService,
		private _alert: SweetAlertService,
		private _general: GeneralService,
		private _thirds: ThirdPartiesService,
		private _roles: RolesService,
		private _clients: ClientsService
	) {}

	ngOnInit(): void {
		this.get();
		this.search();
		this.getSelects();
	}

	get(): void {
		this._service.get().subscribe((response: any) => {
			if (!response) {
				return;
			}

			this.list = response;
			this.listCopy = JSON.parse(JSON.stringify(response));
		});
	}

	create(): void {
		this._alert.loading();

		this._service.create({ idusuario: '0', ...this.data }).subscribe(
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

	changeStatus({ idusuario }, status: 'A' | 'I'): void {
		this._alert.loading();

		this.data['documento'] = this.data.numerodocumento;

		this._service.changeStatus(idusuario, status).subscribe(
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
				idrol: '0',
				idclientesede: '0',
				idcliente: '0',
				idtercero: '0',
				idtipodocumento: '0',
				documento: '',
				apellidos: '',
				nombre: '',
				direccion: '',
				telefono: '',
				email: '',
				login: '',
				clave: '',
			};
			return;
		}

		this.data = data;
		this.data['idcliente'] = String(this.data['idcliente']);
		this.data['idtercero'] = String(this.data['idtercero']);

		// this.getSelects();
		this.getSedes(this.data.idclientesede);
	}

	search(): void {
		this.searchTerm$.subscribe((term) => {
			this.list = this.listCopy.filter(
				(item: any) =>
					item.nombre.toLowerCase().indexOf(term.toLowerCase()) >= 0
			);
		});
	}

	getSelects(): void {
		this._general.getTypesDocuments().subscribe((response) => {
			this.listDocumentsTypes = response;
		});

		this._clients.get().subscribe((response) => {
			this.listCustomers = response;
		});

		this._roles.get().subscribe((response) => {
			this.listRoles = response;
		});

		this._thirds.get().subscribe((response) => {
			this.listThirdsParties = response;
		});
	}

	getSedes(idcliente: string): void {
		this._clients.bySite({ idcliente}).subscribe((response) => {
			this.listSites = response;
		});
	}
}
