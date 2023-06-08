/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilesService } from 'app/core/helpers/files.service';
import { SweetAlertService } from 'app/core/helpers/sweet-alert.service';
import { OrdersService } from 'app/core/services/orders.service';
import { RatesService } from 'app/core/services/rates.service';
import { ServicesService } from 'app/core/services/services.service';
import { ThirdPartiesService } from 'app/core/services/third-parties.service';
import { Observable, Subject, forkJoin } from 'rxjs';

@Component({
	selector: 'app-details',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnChanges {
	@Input() viewInfoOrden: boolean = true;
	@Input() idtercero: string = null;

	isLoading: boolean = false;

	idorden: string = '0';
	files: any[] = [];
	formData: FormData = new FormData();

	info: any = null;

	infoDetail: any = null;

	list: any[] = [];
	listCopy: any[] = [];
	@Output() dataList = new EventEmitter();

	private _option: 'REALIZADA' | 'ASIGNADA' | 'POR ASIGNAR' | 'ANULADA' | 'TOTAL' = 'ASIGNADA';
	// options$ = new Subject<string>(this.option);

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

	constructor(
		private _service: OrdersService,
		private _services: ServicesService,
		private _thirds: ThirdPartiesService,
		private route: ActivatedRoute,
		private _alert: SweetAlertService,
		private _file: FilesService,
		private _rates: RatesService,

	) { }

	ngOnInit(): void {
		if (this.idtercero) {
			this.loadData();
			return;
		}
		this.route.params.subscribe((params) => {
			this.idorden = params['id'];
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

		this.getThirdsServices('0', '0');
	}

	get(idorden: string = '0'): void {
		this._service
			.get({ idorden })
			.subscribe((response) => {
				if (!response) {
					return;
				}

				this.info = response[0];
			});
	}

	getDetailSupportSelect(iddetalleorden: string): void {
		this._service.getSupports({ iddetalleorden }).subscribe((response) => {
			this.listSupport = response;
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

				this.sort();
			});
	}

	changeStatusOrderDetail({ iddetalleorden }, status: 'F'): void {
		this._alert.loading();

		this._service.changeStatusOrderDatails(iddetalleorden, status).subscribe(
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
					text: error.mensaje || 'Error al procesar la solicitud.',
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
		this._rates.get({ idservicio, idciudad }).subscribe((response) => {
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
		this._alert.loading();

		this._service.assign({ ...this.data, valor: this.data.valor || '1' }).subscribe(
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

	showSection(section: 'add' | 'edit' | 'assign', data = null): void {
		this.section = section;

		if (!data && section === 'add' || section === 'edit') {
			this.data = {
				iddetalleorden: '',
				idservicio: '',
				cantidad: '',
				referencia: '',
				observacion: '',
			};
			return;
		}
		this.data = JSON.parse(JSON.stringify(data));

		if (data && section === 'assign') {
			this.data = {
				...this.data,
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

	fnBtnModal(item: any = null): void {
		this.infoDetail = {...item, iddetalleordensoporte: ''};
		this.files.forEach((element) => {
			this.formData.delete(element.name);
		});
		this.files = [];

		if (item) {
			this.getDetailSupportSelect(item.iddetalleorden);
		}

		const modal = document.getElementById('modalUploadFile');

		modal.classList.toggle('hidden');
	}

	onFileChange(pFileList: File[]): void {
		if (this.isLoading) {
			return;
		}
		pFileList.forEach((e) => {
			this.files.push(e);
		});
	}

	deleteFile(f: any): void {
		this.files = this.files.filter(w => w.name !== f.name);
	}

	fnUpload(): void {
		this.isLoading = true;
		this._alert.loading();

		if (this.files.length === 0) {
			this.isLoading = false;
			this._alert.closeAlert();
			this._alert.error({
				title: 'Error',
				text: 'Ingrese un archivo',
			});
			return;
		}

		if (this.files.length !== 1) {
			this.isLoading = false;
			this._alert.closeAlert();
			this._alert.error({
				title: 'Error',
				text: 'Solamente se permite un archivo',
			});
			return;
		}

		this.files.forEach((r) => {
			this.formData.append('files', r);
		});

		this._file.upload(this.formData).subscribe(
			(response) => {
				this.isLoading = false;

				if (response.codigo !== 0) {
					this._alert.loading();
					this._alert.error({
						title: response.titulo,
						text: response.mensaje,
					});
					return;
				}

				forkJoin(
					response.rutas.map(e => this.uploadSupport(this.infoDetail.iddetalleordensoporte, e.path))
				).subscribe(
					(r: any[]) => {
						this._alert.loading();
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
		iddetalleordensoporte: string,
		soporte: string
	): Observable<any> {
		return this._service.uploadSupport(iddetalleordensoporte, soporte);
	}

	getInfoRates(): void {
		this.infoThirdsServices = this.listThirdsServices.find(item => item.idterceroservicio === this.data.idterceroservicio);
	}

	private sort(): void {
		if (this._option === 'TOTAL') {
			this.list = this.listCopy;
		} else {
			this.list = this.listCopy.filter((item: any) => item.estado === this._option);
		}

		this.fnPagination();
	}
}
