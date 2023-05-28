/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FilesService } from 'app/core/helpers/files.service';
import { SweetAlertService } from 'app/core/helpers/sweet-alert.service';
import { GeneralService } from 'app/core/services/general.service';
import { ServicesService } from 'app/core/services/services.service';
import { Subject } from 'rxjs';

@Component({
	selector: 'app-services',
	templateUrl: './services.component.html',
	styleUrls: ['./services.component.scss'],
})
export class ServicesComponent implements OnInit {
	list: any[] = [];
	listCopy: any[] = [];

	data: any = null;

	section: 'add' | 'edit' | null;

	listUnits: any[] = [];
	listTypesServices: any[] = [];

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
		private _service: ServicesService,
		private _alert: SweetAlertService,
		private _general: GeneralService,
		private _files: FilesService
	) {}

	ngOnInit(): void {
		this.get();
		this.getSelects();
		this.search();
	}

	get(): void {
		this._service.get().subscribe((response) => {
			if (!response) {
				return;
			}

			this.list = response;
			this.listCopy = JSON.parse(JSON.stringify(response));

			this.fnPagination();
		});
	}

	create(): void {
		this._alert.loading();

		this.data['idunidad'] = this.data.idunidad_medida;
		this._service.create({ idservicio: '0', ...this.data }).subscribe(
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

		this.data['idunidad'] = this.data.idunidad_medida;
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

	changeStatus({ idservicio }, status: 'A' | 'I'): void {
		this._alert.loading();

		this._service.changeStatus(idservicio, status).subscribe(
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
				idservicio: '',
				idtiposervicio: '',
				idunidad_medida: '',
				codigo: '',
				nombre: '',
				descripcion: '',
			};
			return;
		}

		this.data = JSON.parse(JSON.stringify(data));
	}

	getSelects(): void {
		this._general.getMeasuringUnits().subscribe((response) => {
			if (!response) {
				return;
			}

			this.listUnits = response;
		});

		this._service.getTypes().subscribe((response) => {
			if (!response) {
				return;
			}

			this.listTypesServices = response;
		});
	}

	search(): void {
		this.searchTerm$.subscribe((term) => {
			this.list = this.listCopy.filter(
				(item: any) =>
					item.nombre.toLowerCase().indexOf(term.toLowerCase()) >= 0
			);

			this.fnPagination();
		});
	}

	fnPagination(): void {
		this.contentPagination.pages = [];
		this.contentPagination.totalPages = Math.ceil(
			this.list.length / this.contentPagination.countForPages
		);
		for (let index = 0; index < this.contentPagination.totalPages; index++) {
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
			case "next":
				this.contentPagination.current = pages[current + range]?.page || 0;
				break;
			case "previus":
				this.contentPagination.current = pages[current - range]?.page || 0;
				break;
			default:
				this.contentPagination.current = Number(action);
				break;
		}
	}

	fnDisabledBtn(action: string): boolean | any {
		const { current, pages, range } = this.contentPagination;
		switch (action) {
			case "next":
				return pages[current + range] || 0;
			case "previus":
				return pages[current - range] || 0;
		}
	}

	getLengthStatus(key: string): number {
		return this.list.filter((element) => element.estado == key).length;
	}

	generateExcel(): void {
		this._files.exportAsExcelFile(this.list, 'servicios');
	}
}
