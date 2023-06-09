import { Component, OnDestroy, OnInit } from '@angular/core';
import { FilesService } from 'app/core/helpers/files.service';
import { StorageService } from 'app/core/helpers/storage.service';
import { SweetAlertService } from 'app/core/helpers/sweet-alert.service';
import { ClientsService } from 'app/core/services/clients.service';
import { Actions, MenuService } from 'app/core/services/menu.service';
import { OrdersService } from 'app/core/services/orders.service';
import { ServicesService } from 'app/core/services/services.service';
import { Observable, Subject, forkJoin } from 'rxjs';

@Component({
	selector: 'app-orders',
	templateUrl: './orders.component.html',
	styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {

	actions: any;

	list: any[] = [];
	listCopy: any[] = [];

	listCustomers: any[] = [];
	listSites: any[] = [];
	listTypes: any[] = [];
	listServices: any[] = [];

	data: any = null;

	dataDetail: any = null;

	section: 'add' | 'edit' | null;

	addDetails: boolean = false;
	listDetails: any[] = [];

	searchTerm$ = new Subject<string>();

	idcliente = String(this._storage.getUser().idcliente);
	idclientesede = this._storage.getUser().idclientesede;

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

	options: 'ACTIVO' | 'PROCESADO' | 'ANULADA' | 'TOTAL' = 'ACTIVO';

	constructor(
		private _orders: OrdersService,
		private _files: FilesService,
		private _clients: ClientsService,
		private _alert: SweetAlertService,
		private _services: ServicesService,
		private _storage: StorageService,
		private _menu: MenuService
	) { }

	ngOnInit(): void {
		this.actions = this._menu.getAccessByRole(this._storage.getRolID(), { name: 'process.orders' });

		this.get();
		this.search();
		this.getTypes();
		this.getClients();
		this.getServices();
	}

	get(): void {
		if (this.actions === '*' || this.actions?.list) {
			this._orders
				.get()
				.subscribe((response: any) => {
					if (!response) {
						return;
					}
					response.map((element: any) => {
						element.fechaentrega = element.fechaentrega
							.split('/')
							.reverse()
							.join('-');
						return element;
					});

					this.list = response;
					this.listCopy = JSON.parse(JSON.stringify(response));

					this.sort();
				});
		}

	}

	getTypes(): void {
		this._orders.getTypes().subscribe((response: any) => {
			if (!response) {
				return;
			}

			this.listTypes = response;
		});
	}

	getServices(): void {
		this._services.get().subscribe((response) => {
			this.listServices = response;
		});
	}

	create(): Observable<any> {
		return this._orders.create({ idorden: '0', ...this.data });
	}

	fnCreate(): void {
		if (this.actions === '*' || this.actions?.create) {
			if (this.listDetails.length === 0) {
				this._alert.error({
					title: 'Error',
					text: 'Error al crear la orden, debe de tener por lo menos, un servicio asociado.',
				});
				return;
			}
			this._alert.loading();
			this.create()
				// .pipe(switchMap((r: any) => this.createDetail(r)))
				.subscribe(
					(response) => {
						if (response.codigo !== 0) {
							this._alert.error({
								title: response.titulo,
								text: response.mensaje,
							});
							return;
						}
						forkJoin(
							this.listDetails.map(e =>
								this.createDetail(response, e)
							)
						).subscribe(
							(r: any[]) => {
								this._alert.closeAlert();
								this.get();
								this.showSection(null);
								const i = r.filter(
									element => element.codigo !== 0
								);
								if (i.length > 0) {
									this._alert.error({
										title: 'Error',
										text: i.join(', '),
									});
									return;
								}

								this._alert.success({
									title: response.titulo,
									text: 'Orden y Detalle(s) de Orden Creados Correctamente...',
								});
							},
							({ error }) => {
								this._alert.error({
									title: error.titulo || 'Error',
									text:
										error.mensaje ||
										'Error al procesar la solicitud.',
								});
							}
						);
					},
					({ error }) => {
						this._alert.error({
							title: error.titulo || 'Error',
							text:
								error.mensaje || 'Error al procesar la solicitud.',
						});
					}
				);
		} else {
			this._alert.error({
				title: 'Error',
				text: 'No tiene acceso a esta acción.',
			});
		}
	}

	createDetail(response: any, data): Observable<any> {
		if (response.codigo !== 0) {
			this._alert.error({
				title: response.titulo || 'Error',
				text: response.mensaje || 'Error al procesar la solicitud.',
			});
			return;
		}

		return this._orders.createDetail({
			...data,
			idorden: response.idorden,
			iddetalleorden: '0',
		});
	}

	update(): void {
		this._alert.loading();

		this._orders.create(this.data).subscribe(
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

	changeStatus({ idorden }, status: 'A' | 'I'): void {
		this._alert.loading();

		this._orders.changeStatus(idorden, status).subscribe(
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
				idorden: '',
				idtipoorden: '0',
				fechaentrega: '',
				horaentrega: '',
				observacion: '',
				idcliente: this.idcliente,
				idclientesede: this.idclientesede
			};

			this.dataDetail = {
				idservicio: '0',
				cantidad: '0',
				referencia: '',
				observacion: '',
			};

			this.listDetails = [];
			if (this.data.idcliente !== '0') {
				this.getSites(this.data.idcliente);
			}
			return;
		}

		this.data = JSON.parse(JSON.stringify(data));
		this.data['idcliente'] = String(this.data.idcliente);

		this.getSites(this.data.idcliente);

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

	getClients(): void {
		this._clients.get().subscribe((response) => {
			this.listCustomers = response;
		});
	}

	getSites(idcliente: string | number): void {
		this._clients.bySite({ idcliente }).subscribe((response) => {
			this.listSites = response;
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
		return this.listCopy.filter(element => element.estado === key).length;
	}

	generateExcel(): void {
		this._files.exportAsExcelFile(this.list, 'ordenes');
	}

	fnAddDetails(): void {
		this.listDetails.push(this.dataDetail);

		this.dataDetail = {
			idservicio: '0',
			cantidad: '0',
			referencia: '',
			observacion: '',
		};
	}

	getNameService(id: number): string {
		return this.listServices.find(r => r.idservicio === id).nombre;
	}

	removeDetail(id: number): void {
		this.listDetails = this.listDetails.filter(e => e.idservicio !== id);
	}

	sort(): void {
		if (this.options === 'TOTAL') {
			this.list = this.listCopy;
		} else {
			this.list = this.listCopy.filter((item: any) => item.estado === this.options);
		}

		this.fnPagination();
	}
}
