/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FilesService } from 'app/core/helpers/files.service';
import { SweetAlertService } from 'app/core/helpers/sweet-alert.service';
import { GeneralService } from 'app/core/services/general.service';
import { OrdersService } from 'app/core/services/orders.service';
import { ReasonsService } from 'app/core/services/reasons.service';
import { ServicesService } from 'app/core/services/services.service';
import { Subject } from 'rxjs';

interface Section {
	section: 'M' | 'U' | 'O' | 'S';
	title?: string;
	data?: any;
	callback?: () => void;
}

@Component({
	selector: 'app-parameter-setting',
	templateUrl: './parameter-setting.component.html',
	styleUrls: ['./parameter-setting.component.scss'],
})
export class ParameterSettingComponent implements OnInit {
	section!: Section;
	sectionModal: 'add' | 'edit' | null;

	listSection: Section[] = [
		{
			section: 'M',
			title: 'Motivos de rechazo',
			data: {
				list: [],
			},
			callback: (): void => {
				this.getSeasons();
			},
		},
		{
			section: 'U',
			title: 'Unidades de medida',
			data: {
				list: [],
			},
			callback: (): void => {
				this.getMeasuringUnits();
			},
		},
		{
			section: 'O',
			title: 'Tipos de ordenes',
			data: {
				list: [],
			},
			callback: (): void => {
				this.getTypesOrders();
			},
		},
		{
			section: 'S',
			title: 'Tipos de servicios',
			data: {
				list: [],
			},
			callback: (): void => {
				this.getTypesServices();
			},
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
		private _general: GeneralService,
		private _reason: ReasonsService,
		private _order: OrdersService,
		private _service: ServicesService,
		private _alert: SweetAlertService,
		private _files: FilesService
	) {}

	ngOnInit(): void {
		this.changeSection({ section: 'M' });
		this.search();
	}

	changeSection({ section, data, callback }: Section): void {
		this.section = this.listSection.find(r => r.section === section);

		if (data) {
			this.section.data = data;
		}

		if (callback) {
			this.section.callback = callback;
		}

		if (this.sectionModal) {
			this.sectionModal = null;
		}

		this.section.callback();
	}

	getSeasons(): void {
		this._reason.get().subscribe((response) => {
			this.section.data.list = response;
			this.section.data.listCopy = JSON.parse(JSON.stringify(response));

			this.fnPagination();
		});
	}

	getMeasuringUnits(): void {
		this._general.getMeasuringUnits().subscribe((response) => {
			this.section.data.list = response;
			this.section.data.listCopy = JSON.parse(JSON.stringify(response));

			this.fnPagination();
		});
	}

	getTypesOrders(): void {
		this._order.getTypes().subscribe((response) => {
			this.section.data.list = response;
			this.section.data.listCopy = JSON.parse(JSON.stringify(response));

			this.fnPagination();
		});
	}

	getTypesServices(): void {
		this._service.getTypes().subscribe((response) => {
			this.section.data.list = response;
			this.section.data.listCopy = JSON.parse(JSON.stringify(response));

			this.fnPagination();
		});
	}

	search(): void {
		this.searchTerm$.subscribe((term) => {
			this.section.data.list = this.section.data.listCopy.filter((item: any) => {
				const itemValues = Object.values(item);
				return itemValues.some((value: any) =>
					String(value).toLowerCase().includes(term.toLowerCase())
				);
			});

			this.fnPagination();
		});
	}

	showSection(section: 'add' | 'edit', data = null): void {
		this.sectionModal = section;

		if (!data) {
			this.section.data.data = {
				nombre: '',
				prefijo: '',
			};
			return;
		}

		this.section.data.data = JSON.parse(JSON.stringify(data));
	}

	create(): void {
		switch (this.section.section) {
			case 'M':
				this.createReason();
				break;

			case 'O':
				this.createTypeOrder();
				break;

			case 'U':
				this.createMeasurementUnit();
				break;

			case 'S':
				this.createTypeService();
				break;
		}
	}

	update(): void {
		switch (this.section.section) {
			case 'M':
				this.updateReason();
				break;

			case 'O':
				this.updateTypeOrder();
				break;

			case 'U':
				this.updateMeasurementUnit();
				break;
			case 'S':
				this.createTypeService();
				break;
		}
	}

	reasonChangeStatus({ idmotivorechazo }, status: 'A' | 'I'): void {
		this._alert.loading();

		this._reason.changeStatus(idmotivorechazo, status).subscribe(
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

				this.getSeasons();
			},
			({ error }) => {
				this._alert.error({
					title: error.titulo || 'Error',
					text: error.mensaje || 'Error al procesar la solicitud.',
				});
			}
		);
	}

	createReason(): void {
		this._alert.loading();

		this._reason
			.create({
				idmotivorechazo: '0',
				nombre: this.section.data.data['nombre'],
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

					this.getSeasons();
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

	updateReason(): void {
		this._alert.loading();

		this._reason.create({ ...this.section.data.data }).subscribe(
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

				this.getSeasons();
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

	measurementUnitsChangeStatus({ idunidad_medida }, status: 'A' | 'I'): void {
		this._alert.loading();

		this._general
			.changeStatusMeasurementUnits(idunidad_medida, status)
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

					this.getMeasuringUnits();
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

	createMeasurementUnit(): void {
		this._alert.loading();

		this._general
			.createMeasurementUnit({ idunidad: 0, ...this.section.data.data })
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

					this.getMeasuringUnits();
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

	updateMeasurementUnit(): void {
		this._alert.loading();

		this.section.data.data['idunidad'] =
			this.section.data.data['idunidad_medida'];
		this._general
			.createMeasurementUnit({ ...this.section.data.data })
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

					this.getMeasuringUnits();
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

	typeOrderChangeStatus({ idtipoorden }, status: 'A' | 'I'): void {
		this._alert.loading();

		this._order.changeStatusType(idtipoorden, status).subscribe(
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

				this.getTypesOrders();
			},
			({ error }) => {
				this._alert.error({
					title: error.titulo || 'Error',
					text: error.mensaje || 'Error al procesar la solicitud.',
				});
			}
		);
	}

	createTypeOrder(): void {
		this._alert.loading();

		this._order
			.createType({ idtipoorden: '0', ...this.section.data.data })
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

					this.getTypesOrders();
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

	updateTypeOrder(): void {
		this._alert.loading();

		this._order.createType({ ...this.section.data.data }).subscribe(
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

				this.getTypesOrders();
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

	createTypeService(): void {
		this._alert.loading();

		this._service
			.createType({ idtiposervicio: '0', ...this.section.data.data })
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

					this.getTypesServices();
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

	updateTypeService(): void {
		this._alert.loading();

		this._service.createType({ ...this.section.data.data }).subscribe(
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

				this.getTypesServices();
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

	typeServicesChangeStatus({ idtiposervicio }, status: 'A' | 'I'): void {
		this._alert.loading();

		this._service.changeStatus(idtiposervicio, status).subscribe(
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

				this.getTypesServices();
			},
			({ error }) => {
				this._alert.error({
					title: error.titulo || 'Error',
					text: error.mensaje || 'Error al procesar la solicitud.',
				});
			}
		);
	}

	fnPagination(): void {
		this.contentPagination.pages = [];
		this.contentPagination.totalPages = Math.ceil(
			this.section.data.list.length / this.contentPagination.countForPages
		);
		for (
			let index = 0;
			index < this.contentPagination.totalPages;
			index++
		) {
			this.contentPagination.pages.push({
				data: this.section.data.list.slice(
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
		return this.section.data.list.filter(element => element.estado === key)
			.length;
	}

	generateExcel(): void {
		this._files.exportAsExcelFile(
			this.section.data.list,
			this.section.title.split(' ').join('_').toLowerCase()
		);
	}
}
