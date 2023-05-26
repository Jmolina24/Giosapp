/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { SweetAlertService } from 'app/core/helpers/sweet-alert.service';
import { RolesService } from 'app/core/services/roles.service';
import { Subject } from 'rxjs';

@Component({
	selector: 'app-roles',
	templateUrl: './roles.component.html',
	styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit {
	list: any[] = [];
	listCopy: any[] = [];

	data: any = null;

	section: 'add' | 'edit' | null;

	searchTerm$ = new Subject<string>();

	constructor(
		private _service: RolesService,
		private _alert: SweetAlertService
	) {}

	ngOnInit(): void {
		this.get();
		this.search();
	}

	get(): void {
		this._service.get().subscribe((response) => {
			this.list = response;
			this.listCopy = JSON.parse(JSON.stringify(response));
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

		this.data = JSON.parse(JSON.stringify(data));
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
			({ error }) => {
				this._alert.error({
					title: error.titulo || 'Error',
					text: error.mensaje || 'Error al procesar la solicitud.',
				});
			}
		);
	}

	getTypes(item: string): string {
		return {
			C: 'Cliente',
			T: 'Tercero',
			A: 'Administrador',
		}[item];
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
