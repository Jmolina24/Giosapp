/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FilesService } from 'app/core/helpers/files.service';
import { SweetAlertService } from 'app/core/helpers/sweet-alert.service';
import { Action, MenuService } from 'app/core/services/menu.service';
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

	menu: any[] = [];
	menuBase: any[] = [];

	data: any = null;

	section: 'add' | 'edit' | null;

	searchTerm$ = new Subject<string>();

	contentPagination: {
		current: number;
		pages: { page: number; data: any[] }[];
		countForPages: number;
		totalPages: number;
		range?: number;
	} = {
		current: 0,
		pages: [{ data: [], page: 0 }],
		countForPages: 5,
		totalPages: 0,
		range: 3,
	};

	actions: Action[];

	selectedValue: string;
	options: string[] = ['Opción 1', 'Prueba 2'];


	constructor(
		private _service: RolesService,
		private _alert: SweetAlertService,
		private _files: FilesService,
		private _menu: MenuService
	) {}

	ngOnInit(): void {
		this.actions = this._menu.getActions('access.roles');

		if (this.getAction('list')) {
			this.get();
			this.search();
			this.menuBase = JSON.parse(JSON.stringify(this._menu.getMenu()));
		}
	}

	get(): void {
		this._service.get().subscribe((response) => {
			response = response.map((r) => {
				r.menu = r.menu.trim();
				return r;
			});
			this.list = response;
			this.listCopy = JSON.parse(JSON.stringify(response));

			this.fnPagination();
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

	showSection(section: 'add' | 'edit', data = null): void {
		this.section = section;

		if (!data) {
			this.data = {
				nombre: '',
				tipo: '',
				menu: '',
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
			this.list = this.listCopy.filter((item: any) => {
				const itemValues = Object.values(item);
				return itemValues.some((value: any) =>
					String(value).toLowerCase().includes(term.toLowerCase())
				);
			});

			this.fnPagination();
		});
	}

	fnPagination(): void {
		this.contentPagination.pages = [];
		this.contentPagination.totalPages = Math.ceil(
			this.list.length / this.contentPagination.countForPages
		);
		for (
			let index = 0;
			index < this.contentPagination.totalPages;
			index++
		) {
			this.contentPagination.pages.push({
				data: this.list.slice(
					this.contentPagination.countForPages * index,
					this.contentPagination.countForPages * (index + 1)
				),
				page: index,
			});
		}
		this.contentPagination.current = 0;
	}

	fnBtnChangePage(action: string): void {
		const { current, pages, range } = this.contentPagination;
		switch (action) {
			case 'next':
				this.contentPagination.current =
					pages[current + range]?.page || 0;
				break;
			case 'previus':
				this.contentPagination.current =
					pages[current - range]?.page || 0;
				break;
			default:
				this.contentPagination.current = Number(action);
				break;
		}
	}

	fnDisabledBtn(action: string): boolean | any {
		const { current, pages, range } = this.contentPagination;
		switch (action) {
			case 'next':
				return pages[current + range] || 0;
			case 'previus':
				return pages[current - range] || 0;
		}
	}

	getLengthStatus(key: string): number {
		return this.list.filter(element => element.estado === key).length;
	}

	generateExcel(): void {
		this._files.exportAsExcelFile(this.list, 'roles');
	}

	fnBtnModal(): void {
		const modal = document.getElementById('modalConfigMenu');

		modal.classList.toggle('hidden');

		const menu = JSON.parse(JSON.stringify(this.menuBase));

		const data = menu.filter((e: { type: string }) => e.type === 'basic');
		data.push(
			...menu
				.filter(
					(e: { type: string; children: any[] }) =>
						e.type !== 'basic' || e.children?.length > 0
				)
				.reduce((a, b) => a.concat(b.children), [])
		);

		if (this.data.menu !== '') {
			const menuUser = JSON.parse(
				JSON.stringify(JSON.parse(this.data.menu) || this.data.menu)
			);

			if (menuUser) {
				data.map((e) => {
					e.status =
						menuUser
							.map(r => r.id)
							.filter(r => r.includes(e.id)).length > 0;
					if (e.status) {
						e.actions = e.actions.map((r) => {
							r.status =
								menuUser
									.map(x => x.actions.map(t => t.id))
									.filter(t => t.includes(r.id)).length > 0;
							return r;
						});
					}
					return e;
				});
			}
		}

		this.menu = data;
	}

	saveMenu(): void {
		this.data.menu = this.menu
			.filter(e => e.actions.some(r => r.status) || e.status)
			.map(e => ({
				id: e.id,
				actions: e.actions
					.filter(x => x.status)
					.map(r => ({ id: r.id })),
			}));

		this.fnBtnModal();
	}

	activeModule(id: string): boolean {
		return this.menu
			.filter(e => e.id === id)
			.find(e => e.actions.some(r => r.status));
	}

	changeStatusItem(item: any): void {
		item.actions.map((e: any) => {
			e.status = item.status;
			return e;
		});
	}

	getAction(item: Action): boolean {
		return this.actions.includes(item);
	}

	onOptionSelected(event: any): void {
		console.log('Opción seleccionada:', event.option.value);
	}
}
