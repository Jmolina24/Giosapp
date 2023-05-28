import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'app/core/services/general.service';
import { OrdersService } from 'app/core/services/orders.service';
import { ReasonsService } from 'app/core/services/reasons.service';
import { ServicesService } from 'app/core/services/services.service';
import { Subject } from 'rxjs';

interface Section {
	section: 'M' | 'U' | 'O' | 'S',
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

	listSection: Section[] = [
		{
			section: 'M',
			title: 'Motivos de rechazo',
			data: {
				list: []
			},
			callback: () => {
				this.getSeasons();
			}
		},
		{
			section: 'U',
			title: 'Unidades de medida',
			data: {
				list: []
			},
			callback: () => {
				this.getMeasuringUnits();
			}
		},
		{
			section: 'O',
			title: 'Tipos de ordenes',
			data: {
				list: []
			},
			callback: () => {
				this.getTypesOrders();
			}
		},
		{
			section: 'S',
			title: 'Tipos de servicios',
			data: {
				list: []
			},
			callback: () => {
				this.getTypesServices();
			}
		}
	];

	searchTerm$ = new Subject<string>();

	constructor(private _general: GeneralService, private _reason: ReasonsService, private _order: OrdersService, private _service: ServicesService) { }

	ngOnInit(): void {
		this.changeSection({ section: 'M' });
		this.search()
	}

	changeSection({ section, data, callback }: Section): void {
		this.section = this.listSection.find((r) => r.section === section);

		if (data) this.section.data = data;

		if (callback) this.section.callback = callback;

		this.section.callback();
	}

	getSeasons(): void {
		this._reason.get().subscribe((response) => {
			this.section.data.list = response;
			this.section.data.listCopy = JSON.parse(JSON.stringify(response));
		})
	}

	getMeasuringUnits(): void {
		this._general.getMeasuringUnits().subscribe((response) => {
			this.section.data.list = response;
			this.section.data.listCopy = JSON.parse(JSON.stringify(response));
		})
	}

	getTypesOrders(): void {
		this._order.getTypes().subscribe((response) => {
			this.section.data.list = response;
			this.section.data.listCopy = JSON.parse(JSON.stringify(response));
		})
	}

	getTypesServices(): void {
		this._service.getTypes().subscribe((response) => {
			this.section.data.list = response;
			this.section.data.listCopy = JSON.parse(JSON.stringify(response));
		})
	}

	search(): void {
		this.searchTerm$.subscribe((term) => {
			this.section.data.list = this.section.data.listCopy
			// .map((r: any) => Object.values(r))
			.filter((item: any) => item.nombre.toLowerCase().indexOf(term.toLowerCase()) >= 0);
		});
	}
}
