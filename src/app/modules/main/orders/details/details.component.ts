/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
import {
	Component,
	EventEmitter,
	Input,
	OnChanges,
	OnInit,
	Output,
	SimpleChanges,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilesService } from 'app/core/helpers/files.service';
import { StorageService } from 'app/core/helpers/storage.service';
import { SweetAlertService } from 'app/core/helpers/sweet-alert.service';
import { Action, MenuService } from 'app/core/services/menu.service';
import { OrdersService } from 'app/core/services/orders.service';
import { RatesService } from 'app/core/services/rates.service';
import { ServicesService } from 'app/core/services/services.service';
import { ThirdPartiesService } from 'app/core/services/third-parties.service';
import { Observable, Subject, forkJoin } from 'rxjs';

import * as _ from 'lodash';

@Component({
	selector: 'app-details',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnChanges {
	@Input() viewInfoOrden: boolean = true;
	@Input() idtercero: string = null;

	support: any;

	isLoading: boolean = false;

	idorden: string = '0';
	idrole: string | number = '0';
	files: any[] = [];
	listFiles: any[] = [];
	formData: FormData = new FormData();

	info: any = null;

	infoDetail: any = null;

	list: any[] = [];
	listCopy: any[] = [];
	@Output() dataList = new EventEmitter();

	private _option:
		| 'REALIZADA'
		| 'ASIGNADA'
		| 'POR ASIGNAR'
		| 'ANULADA'
		| 'TOTAL' = 'ASIGNADA';

	@Input()
	set option(value: any) {
		this._option = value;
		this.sort();
	}

	listSupport: any[] = [];
	listServices: any[] = [];
	listThirds: any[] = [];
	listThirdsServices: any[] = [];
	infoThirdsServices: any = null;

	data: any = null;
	section: 'add' | 'edit' | 'assign' | null;
	action: 'view' | 'upload' | null = null;

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

	constructor(
		private _service: OrdersService,
		private _services: ServicesService,
		private _thirds: ThirdPartiesService,
		private route: ActivatedRoute,
		private _alert: SweetAlertService,
		private _file: FilesService,
		private _rates: RatesService,
		private _menu: MenuService,
		private _storage: StorageService
	) {}

	ngOnInit(): void {
		this.idrole = this._storage.getRolID();
		if (this.idtercero) {
			this.actions = this._menu.getActions('process.assigned-services');
			this.loadData();
			return;
		}
		this.route.params.subscribe((params) => {
			this.idorden = params['id'];
			this.actions = this._menu.getActions('process.orders');
			if (!this.idorden) {
				return;
			}

			this.loadData();
		});
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes.option) {
			this.sort();
		}
	}

	loadData(): void {
		this.get(this.idorden);

		this.getByOrden(this.idorden);

		this.search();

		this.sort();

		this.getServices();

		this.getThirds();
	}

	get(idorden: string = '0'): void {
		this._service.get({ idorden }).subscribe((response) => {
			if (!response) {
				return;
			}

			this.info = response[0];
		});
	}

	getDetailSupportSelect(iddetalleorden: string): void {
		this._service.getSupports({ iddetalleorden }).subscribe((response) => {
			this.listSupport = response
				.filter(({ estado }) => estado === 'CARGADO')
				.map((r: any) => {
					r.soporte = JSON.parse(r.soporte || '[]');
					if (Array.isArray(r.soporte)) {
						r.soporte = r.soporte.map((t: string, index) => {
							const url =
								'https://demo.mainsoft.technology' +
								t.split('/web')[1];
							const y = url.split('.');
							const tipo = y[y.length - 1].toUpperCase();
							const supportObject = { tipo, soporte: url, index: r.iddetalleordensoporte + '-' + (index + 1)  };
							return supportObject;
						});
					} else {
						r.soporte = [];
					}
					return r;
				})
				.reduce(
					(accumulator: any[], r: any) =>
						accumulator.concat(
							r.soporte.map(t => ({ ...r, ...t }))
						),
					[]
				);
		});
	}

	getByOrden(idorden: string = '0'): void {
		this._service
			.getDetails({
				idorden,
				idtercero: this.idtercero,
			})
			.subscribe((response: any) => {
				this.list = response;
				this.listCopy = JSON.parse(JSON.stringify(response));

				if (!this.idtercero) {
					this._option = 'TOTAL';
				}
				this.sort();
			});
	}

	changeStatusOrderDetail({ iddetalleorden }, status: 'F' | 'P' = 'P'): void {
		this._alert.loading();

		this._service
			.changeStatusOrderDatails(iddetalleorden, status)
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

					this.getByOrden(this.idorden);
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

	getServices(): void {
		this._services.get().subscribe((response) => {
			this.listServices = response;
		});
	}

	getThirds(): void {
		this._thirds.get().subscribe((response) => {
			this.listThirds = response;
		});
	}

	getThirdsServices(idservicio: string, idciudad: string): void {
		this._rates
			.get({ idservicio, idciudad })
			.subscribe((response: any[]) => {
				if (response.length === 0) {
					this._alert.error({
						title: 'Error',
						text: 'No Existe Tarifa Parametrizada Para El Servicio. Contactar al Administrador',
					});
					this.showSection(null, null);
					return;
				}
				this.section = 'assign';
				this.listThirdsServices = response;
			});
	}

	create(): void {
		this._alert.loading();

		this._service
			.createDetail({
				idorden: this.idorden,
				iddetalleorden: '0',
				...this.data,
			})
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

					this.getByOrden(this.idorden);
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

		this._service.createDetail({ ...this.data }).subscribe(
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

				this.getByOrden(this.idorden);
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

	assign(): void {
		const { iddetalleorden, idterceroservicio, valor } = this.data;

		if (!iddetalleorden || !idterceroservicio) {
			// if (!iddetalleorden || !idterceroservicio || !valor) {
			this._alert.error({
				title: 'Error',
				text: 'Error al asignar',
			});
			return;
		}

		this._alert.loading();

		this._service
			.assign({ ...this.data, valor: this.data.valor || '1' })
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

					this._alert
						.confirm({
							title: response.titulo,
							text:
								response.mensaje +
								'¿Desea enviar un mensaje al WhatsApp?',
						})
						.then((alertResponse) => {
							if (alertResponse.isConfirmed) {
								const data = JSON.parse(
									JSON.stringify(this.data)
								);
								const message = `👋 Hola, te he Asignado un Servicio para Gestión%0A *SER-${
									data.iddetalleorden
								}*%0A🗓️ ${data.fechaentrega} ⏰ ${
									data.horaentrega
								}%0A%0A*Datos del Cliente*%0A%0ASede-Cliente: ${
									data.clientesede
								} (${data.cliente})%0ADireccion: ${
									data.direccion_sede
								} (${data.ciudadservicio} - ${
									data.deptoservicio
								})%0AContacto: ${data.contacto_sede} ${
									data.telefono_sede
								}
								%0A%0A📝 *Detalle Servicio*
								%0A%0A- *x${data.cantidad} ${data.servicio} - ${data.unidadmedida}*
								%0A%0A*Usuario Asigna:* ${this._storage.getUser().nombre}
								%0A%0A👆 Envía este mensaje. Te atenderemos enseguida.`;
								window.open(
									`https://api.whatsapp.com/send?phone=${data.celular_whatsapp}&text=${message}`
								);
							}
						});

					this.getByOrden(this.idorden);
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

	showSection(section: 'add' | 'edit' | 'assign', data = null): void {
		if (!section) {
			this.section = section;
			return;
		}

		if (!data && section === 'add') {
			this.section = section;
			this.data = {
				iddetalleorden: '',
				idservicio: '',
				cantidad: '',
				referencia: '',
				observacion: '',
			};
			return;
		}
		if (section === 'edit') {
			this.section = section;
			this.data = JSON.parse(JSON.stringify(data));
			return;
		}

		if (data && section === 'assign') {
			this.data = {
				...data,
				idterceroservicio: '',
				valor: '',
			};
			this.getThirdsServices(data.idservicio, data.idciudadservicio);
		}
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
		this.dataList.emit(this.listCopy);
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

	fnBtnModal(action: 'upload' | 'view' | null, item: any = null): void {
		this.action = action;

		this.infoDetail = { ...item, iddetalleordensoporte: '' };
		this.formData.forEach((element, key) => {
			this.formData.delete(key);
		});
		this.files = [];
		this.listFiles = [];

		if (item) {
			this.getDetailSupportSelect(item.iddetalleorden);
		}

		const modal = document.getElementById('modalUploadFile');

		modal.classList.toggle('hidden');
	}

	onFileChange(pFileList: FileList[]): void {
		pFileList = Array.from(pFileList);
		if (this.isLoading) {
			return;
		}

		if (!pFileList) {
			return;
		}

		if (!this.infoDetail.iddetalleordensoporte) {
			this._alert.error({
				title: 'Error',
				text: 'Seleccione un tipo de soporte',
			});
			return;
		}

		const files = pFileList.map((file, index) => ({
			file,
			id: new Date().getTime() + index,
			iddetalleordensoporte: this.infoDetail.iddetalleordensoporte,
		}));

		this.files.push({
			files,
			iddetalleordensoporte: this.infoDetail.iddetalleordensoporte,
		});

		this.listFiles.push(...files);
	}

	getIfExitsIdDetailSoporte(id): boolean {
		return this.listFiles.find(e => e.iddetalleordensoporte === id);
	}

	getNameDetailSoporte(id: any): string {
		return this.listSupport.find(e => e.iddetalleordensoporte === id)
			.tiposoporte;
	}

	deleteFile(f: any, index: number): void {
		this.files[index].files = this.files[index].files.filter(
			r => r.id !== f.id
		);
		this.listFiles = this.listFiles.filter(({ id }) => id !== f.id);
	}

	isIdRepeated(id: number): boolean {
		return this.files.indexOf(id) !== this.files.lastIndexOf(id);
	}

	fnUpload(): void {
		if (this.files.length === 0) {
			this._alert.error({
				title: 'Error',
				text: 'Ingrese un archivo',
			});
			return;
		}

		if (
			this.files.some(e => this.isIdRepeated(e.iddetalleordensoporte))
		) {
			this._alert.error({
				title: 'Error',
				text: 'Solamente se permite un archivo por tipo de soporte',
			});
			return;
		}

		this.isLoading = true;
		this._alert.loading();

		this.listFiles.forEach(({ file }) =>
			this.formData.append('files', file)
		);

		this._file.upload(this.formData).subscribe(
			(response) => {
				this.isLoading = false;

				if (response.codigo !== 0) {
					this._alert.closeAlert();
					this._alert.error({
						title: response.titulo,
						text: response.mensaje,
					});
					return;
				}

				response.rutas.forEach((element: any, index: number) => {
					this.listFiles[index].path = element.path;
				});

				const files = _.chain(this.listFiles)
					.groupBy('iddetalleordensoporte')
					.value();

				forkJoin(
					Object.keys(files).map((r: any) =>
						this.uploadSupport(
							r,
							files[r].map(({ path }) => path)
						)
					)
				).subscribe(
					(r: any[]) => {
						this.isLoading = false;
						this._alert.closeAlert();
						const i = r.filter(element => element.codigo !== 0);
						if (i.length > 0) {
							this._alert.error({
								title: 'Error',
								text: i.join(', '),
							});
							return;
						}

						this._alert.success({
							title: response.titulo,
							text: 'Soporte(s) Cargados Correctamente...',
						});

						this.getByOrden(this.idorden);

						this.fnBtnModal(null);
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
					text: error.mensaje || 'Error al procesar la solicitud.',
				});
			}
		);
	}

	uploadSupport(
		iddetalleordensoporte: string | number,
		soporte: string[]
	): Observable<any> {
		return this._service.uploadSupport(iddetalleordensoporte, soporte);
	}

	getInfoRates(): void {
		this.infoThirdsServices = this.listThirdsServices.find(
			item => item.idterceroservicio === this.data.idterceroservicio
		);
	}

	private sort(): void {
		if (this._option === 'TOTAL') {
			this.list = this.listCopy;
		} else {
			this.list = this.listCopy.filter(
				(item: any) => item.estado === this._option
			);
		}

		this.fnPagination();
	}

	download(url: string): void {
		this._file.download(url);
	}

	downloadAll(): void {
		this._file.downloadAll(this.listSupport);
	}

	fnModalViewFile(file: any = null): void {
		if (file) {
			this.support = file;
		}

		const modal = document.getElementById('modalViewFile');

		modal.classList.toggle('hidden');
	}

	changeFileNextOrPrevius(section: 'next' | 'previus', file: any): void {
		const data = this.listSupport;
		const d = data.findIndex(r => r.index === file.index);

		switch (section) {
			case 'next':
				this.support = data[d + 1 === data.length ? 0 : d + 1];
				break;
			case 'previus':
				this.support = data[d === 0 ? 0 : d - 1];
				break;
		}
	}

	getAction(item: Action): boolean {
		return this.actions.includes(item);
	}
}
