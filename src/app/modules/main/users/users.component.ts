import { Component, OnInit } from '@angular/core';
import { SweetAlertService } from 'app/core/helpers/sweet-alert.service';
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

	data: any = null;

	section: 'add' | 'edit' | null;

	searchTerm$ = new Subject<string>();

	constructor(
		private _service: UsersService,
		private _alert: SweetAlertService
	) {}

	ngOnInit(): void {
		this.get();
		this.search();
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
				idclientesede: '',
				idtercero: '',
				idtipodocumento: '',
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
	}

	search(): void {
		this.searchTerm$.subscribe((term) => {
			this.list = this.listCopy.filter(
				(item: any) =>
					item.nombre.toLowerCase().indexOf(term.toLowerCase()) >= 0
			);
		});
	}
}
