/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilesService } from 'app/core/helpers/files.service';
import { SweetAlertService } from 'app/core/helpers/sweet-alert.service';
import { OrdersService } from 'app/core/services/orders.service';
import { ServicesService } from 'app/core/services/services.service';
import { ThirdPartiesService } from 'app/core/services/third-parties.service';
import { Observable, Subject, forkJoin } from 'rxjs';

@Component({
	selector: 'app-details',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
	@Input() viewInfoOrden: boolean = true;
	@Input() idtercero: string = '0';

	isLoading: boolean = false;

	idorden: string = '0';
	files: any[] = [];
	formData: FormData = new FormData();

	info: any = null;

	infoDetail: any = null;

	list: any[] = [];
	listCopy: any[] = [];

	listServices: any[] = [];
	listThirds: any[] = [];

	data: any = null;

	section: 'add' | 'edit' | null;

	listTerceroServicios: any[] = [
		{
			idterceroservicio: 12,
			idservicio: 10,
			servicio: 'MANTENIMIENTO DE AIRE ACONDICIONADO',
			tiposervicio: 'Refrigeración',
			unidad_medida: 'Unidad',
			idciudadcobertura: 405,
			ciudadcobertura: 'AGUACHICA',
			departamentocobertura: 'CESAR',
			iddepartamentocobertura: 2,
			idtercero: 14,
			tercero: 'CAIMANES SAS',
			valor: 135000,
			porcentaje: 47,
			estado: 'ACTIVO',
			codigoestado: 'A',
		},
		{
			idterceroservicio: 11,
			idservicio: 9,
			servicio: 'SERVICIO CONSERJERÍA',
			tiposervicio: 'Provision Recurso Humano',
			unidad_medida: 'Unidad',
			idciudadcobertura: 405,
			ciudadcobertura: 'AGUACHICA',
			departamentocobertura: 'CESAR',
			iddepartamentocobertura: 2,
			idtercero: 14,
			tercero: 'CAIMANES SAS',
			valor: 123000,
			porcentaje: 64,
			estado: 'ACTIVO',
			codigoestado: 'A',
		},
		{
			idterceroservicio: 10,
			idservicio: 4,
			servicio: 'SERVICIO DE VIGILANCIA 24/7',
			tiposervicio: 'Provision Recurso Humano',
			unidad_medida: 'Unidad',
			idciudadcobertura: 405,
			ciudadcobertura: 'AGUACHICA',
			departamentocobertura: 'CESAR',
			iddepartamentocobertura: 2,
			idtercero: 14,
			tercero: 'CAIMANES SAS',
			valor: 250000,
			porcentaje: 20,
			estado: 'ACTIVO',
			codigoestado: 'A',
		},
		{
			idterceroservicio: 9,
			idservicio: 3,
			servicio: 'MANTENIMIENTO DE PLANTA ELÉCTRICA',
			tiposervicio: 'Mantenimiento',
			unidad_medida: 'Unidad',
			idciudadcobertura: 404,
			ciudadcobertura: 'VALLEDUPAR',
			departamentocobertura: 'CESAR',
			iddepartamentocobertura: 2,
			idtercero: 13,
			tercero: 'JAIR MOLINA',
			valor: 340000,
			porcentaje: 33,
			estado: 'ACTIVO',
			codigoestado: 'A',
		},
		{
			idterceroservicio: 8,
			idservicio: 2,
			servicio: 'SERVICIO TANQUEO COMBUSTIBLE',
			tiposervicio: 'Servicios Relacionados',
			unidad_medida: 'Unidad',
			idciudadcobertura: 404,
			ciudadcobertura: 'VALLEDUPAR',
			departamentocobertura: 'CESAR',
			iddepartamentocobertura: 2,
			idtercero: 13,
			tercero: 'JAIR MOLINA',
			valor: 125000,
			porcentaje: 55,
			estado: 'ACTIVO',
			codigoestado: 'A',
		},
		{
			idterceroservicio: 7,
			idservicio: 1,
			servicio: 'COMBUSTIBLE ACPM PREMIUM',
			tiposervicio: 'Consultoria',
			unidad_medida: 'Galon',
			idciudadcobertura: 404,
			ciudadcobertura: 'VALLEDUPAR',
			departamentocobertura: 'CESAR',
			iddepartamentocobertura: 2,
			idtercero: 13,
			tercero: 'JAIR MOLINA',
			valor: 230000,
			porcentaje: 35,
			estado: 'ACTIVO',
			codigoestado: 'A',
		},
		{
			idterceroservicio: 6,
			idservicio: 10,
			servicio: 'MANTENIMIENTO DE AIRE ACONDICIONADO',
			tiposervicio: 'Refrigeración',
			unidad_medida: 'Unidad',
			idciudadcobertura: 1,
			ciudadcobertura: 'BARRANQUILLA',
			departamentocobertura: 'ATLANTICO',
			iddepartamentocobertura: 1,
			idtercero: 12,
			tercero: 'OSMAN GONZALEZ',
			valor: 325000,
			porcentaje: 52,
			estado: 'ACTIVO',
			codigoestado: 'A',
		},
		{
			idterceroservicio: 5,
			idservicio: 9,
			servicio: 'SERVICIO CONSERJERÍA',
			tiposervicio: 'Provision Recurso Humano',
			unidad_medida: 'Unidad',
			idciudadcobertura: 1,
			ciudadcobertura: 'BARRANQUILLA',
			departamentocobertura: 'ATLANTICO',
			iddepartamentocobertura: 1,
			idtercero: 12,
			tercero: 'OSMAN GONZALEZ',
			valor: 23000,
			porcentaje: 45,
			estado: 'ACTIVO',
			codigoestado: 'A',
		},
		{
			idterceroservicio: 4,
			idservicio: 4,
			servicio: 'SERVICIO DE VIGILANCIA 24/7',
			tiposervicio: 'Provision Recurso Humano',
			unidad_medida: 'Unidad',
			idciudadcobertura: 1,
			ciudadcobertura: 'BARRANQUILLA',
			departamentocobertura: 'ATLANTICO',
			iddepartamentocobertura: 1,
			idtercero: 12,
			tercero: 'OSMAN GONZALEZ',
			valor: 250000,
			porcentaje: 35,
			estado: 'ACTIVO',
			codigoestado: 'A',
		},
		{
			idterceroservicio: 3,
			idservicio: 3,
			servicio: 'MANTENIMIENTO DE PLANTA ELÉCTRICA',
			tiposervicio: 'Mantenimiento',
			unidad_medida: 'Unidad',
			idciudadcobertura: 1,
			ciudadcobertura: 'BARRANQUILLA',
			departamentocobertura: 'ATLANTICO',
			iddepartamentocobertura: 1,
			idtercero: 12,
			tercero: 'OSMAN GONZALEZ',
			valor: 125000,
			porcentaje: 60,
			estado: 'ACTIVO',
			codigoestado: 'A',
		},
		{
			idterceroservicio: 2,
			idservicio: 2,
			servicio: 'SERVICIO TANQUEO COMBUSTIBLE',
			tiposervicio: 'Servicios Relacionados',
			unidad_medida: 'Unidad',
			idciudadcobertura: 1,
			ciudadcobertura: 'BARRANQUILLA',
			departamentocobertura: 'ATLANTICO',
			iddepartamentocobertura: 1,
			idtercero: 12,
			tercero: 'OSMAN GONZALEZ',
			valor: 400000,
			porcentaje: 30,
			estado: 'ACTIVO',
			codigoestado: 'A',
		},
		{
			idterceroservicio: 1,
			idservicio: 1,
			servicio: 'COMBUSTIBLE ACPM PREMIUM',
			tiposervicio: 'Consultoria',
			unidad_medida: 'Galon',
			idciudadcobertura: 1,
			ciudadcobertura: 'BARRANQUILLA',
			departamentocobertura: 'ATLANTICO',
			iddepartamentocobertura: 1,
			idtercero: 12,
			tercero: 'OSMAN GONZALEZ',
			valor: 350000,
			porcentaje: 50,
			estado: 'ACTIVO',
			codigoestado: 'A',
		},
	];

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
		private _file: FilesService
	) {}

	ngOnInit(): void {
		this.route.params.subscribe((params) => {
			this.idorden = params['id'];
			if (!this.idorden) {
				return;
			}

			this.loadData();
		});

		if (this.idtercero) {
			this.loadData();
		}
	}

	loadData(): void {
		this.get(this.idorden);

		this.getByOrden(this.idorden);

		this.search();

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

	getByOrden(idorden: string = '0'): void {
		this._service
			.getDetails({ idorden, idtercero: this.idtercero })
			.subscribe((response: any) => {
				this.list = response;
				this.listCopy = JSON.parse(JSON.stringify(response));
				console.log(response);

				this.fnPagination();
			});
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

	showSection(section: 'add' | 'edit', data = null): void {
		this.section = section;

		if (!data) {
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
	}

	search(): void {
		this.searchTerm$.subscribe((term) => {
			this.list = this.listCopy.filter(
				(item: any) =>
					item.servicio.toLowerCase().indexOf(term.toLowerCase()) >= 0
			);

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

	fnBtnModal(item: any = null): void {
		this.infoDetail = item;
		this.files.forEach((element) => {
			this.formData.delete(element.name);
		});
		this.files = [];

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
				text: 'Ingrese por lo menos un archivo',
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
					response.rutas.map(e => this.uploadSupport('0', e.path))
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

	getTerceroServicios(item: any): any[] {
		console.log(this.listTerceroServicios);
		return this.listTerceroServicios;
	}
}
