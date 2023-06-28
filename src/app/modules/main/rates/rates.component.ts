import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FilesService } from 'app/core/helpers/files.service';
import { SweetAlertService } from 'app/core/helpers/sweet-alert.service';
import { GeneralService } from 'app/core/services/general.service';
import { Action, MenuService } from 'app/core/services/menu.service';
import { RatesService } from 'app/core/services/rates.service';
import { ServicesService } from 'app/core/services/services.service';
import { ThirdPartiesService } from 'app/core/services/third-parties.service';
import { Observable, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
	selector: 'app-rates',
	templateUrl: './rates.component.html',
	styleUrls: ['./rates.component.scss'],
})
export class RatesComponent implements OnInit {
	list: any[] = [];
	listCopy: any[] = [];

	listThirds: any[] = [];
	listServices: any[] = [];
	listDeptos: any[] = [];
	listCities: any[] = [];

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

	control = new FormControl('');
	filteredOptions: Observable<string[]>;

	controlCity = new FormControl('');
	filteredOptionsCities: Observable<string[]>;

	controlThird = new FormControl('');
	filteredOptionsThirds: Observable<string[]>;

	controlService = new FormControl('');
	filteredOptionsServices: Observable<string[]>;

	constructor(
		private _service: RatesService,
		private _alert: SweetAlertService,
		private _files: FilesService,
		private _general: GeneralService,
		private _thirds: ThirdPartiesService,
		private _services: ServicesService,
		private _menu: MenuService
	) {}

	ngOnInit(): void {
		this.actions = this._menu.getActions('administration.rates');

		if (this.getAction('list')) {
			this.get();
			this.search();
			this.getSelects();

			this.filteredOptions = this.control.valueChanges.pipe(
				startWith('' ),
				map(value => this._filter(value || ''))
			);

			this.filteredOptionsCities = this.controlCity.valueChanges.pipe(
				startWith(''),
				map(value => this._filterCities(value || ''))
			);

			this.filteredOptionsThirds = this.controlThird.valueChanges.pipe(
				startWith('' ),
				map(value => this._filterThirds(value || ''))
			);

			this.filteredOptionsServices = this.controlService.valueChanges.pipe(
				startWith(''),
				map(value => this._filterServices(value || ''))
			);
		}
	}

	get(): void {
		this._service.get().subscribe((response) => {
			this.list = response;
			this.listCopy = JSON.parse(JSON.stringify(response));

			this.fnPagination();
		});
	}

	create(): void {
		console.log(this.data);
		return;
		this._alert.loading();

		this._service
			.create({ ...this.data, idterceroservicio: '0' })
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

					this.get();
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
				idterceroservicio: '',
				idtercero: '',
				idservicio: '',
				idciudad: '',
				valor: '',
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

	getSelects(): void {
		this._general.getDeptos().subscribe((response: any) => {
			this.listDeptos = response;
		});

		this._services.get().subscribe((response: any) => {
			this.listServices = response;
		});

		this._thirds.get().subscribe((response: any) => {
			this.listThirds = response;
		});
	}

	getCities(iddepartamento: string): void {
		this._general
			.getCities({ iddepartamento })
			.subscribe((response: any) => {
				this.listCities = response;
			});
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

	getAction(item: Action): boolean {
		return this.actions.includes(item);
	}

	fnCity(idciudad: any): void {
		if (idciudad) {
			this.data.idciudad = idciudad;
		}
	}

	fnThird(idtercero: any): void {
		if (idtercero) {
			this.data.idtercero = idtercero;
		}
	}

	fnServicio(idservicio: any): void {
		if (idservicio) {
			this.data.idservicio = idservicio;
		}
	}

	private _filter(value: string): string[] {
		const filterValue = value.toLowerCase();

		return this.listDeptos.filter(option =>
			option.nombre.toLowerCase().includes(filterValue)
		);
	}

	private _filterCities(value: string): string[] {
		const filterValue = value.toLowerCase();

		return !value ? this.listCities : this.listCities.filter(option =>
			option.nombre.toLowerCase().includes(filterValue)
		);
	}

	private _filterThirds(value: string): string[] {
		const filterValue = value.toLowerCase();

		return this.listThirds.filter(option =>
			option.tercero.toLowerCase().includes(filterValue)
		);
	}

	private _filterServices(value: string): string[] {
		const filterValue = value.toLowerCase();

		return this.listServices.filter(option =>
			option.nombre.toLowerCase().includes(filterValue)
		);
	}
}
