import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientsService } from 'app/core/services/clients.service';
import { GeneralService } from 'app/core/services/general.service';

@Component({
	selector: 'app-detail-site',
	templateUrl: './detail-site.component.html',
	styleUrls: ['./detail-site.component.scss'],
})
export class DetailSiteComponent implements OnInit {
	info: any = {};

	list: any[] = [];

	listDeptos: any[] = [];
	listCities: any[] = [];

	iddepartamento: string = '';
	idCiudad: string = '';

	idcliente: string = '0';

	constructor(
		private _service: ClientsService,
		private _general: GeneralService,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.route.params.subscribe((params) => {
			this.idcliente = params['id'];
			if (!this.idcliente) {
				return;
			}

			this.get(this.idcliente);

			this.getBySite(this.idcliente);

			this.getDeptos();
		});
	}

	get(idcliente: string): void {
		this._service.get({ idcliente }).subscribe((response) => {
			if (!response) {
				return;
			}

			this.info = response[0];
		});
	}

	getBySite(idcliente: string = '0', idciudad: string = '0'): void {
		this._service
			.bySite({ idcliente, idciudad })
			.subscribe((response: any) => {
				this.list = response;
			});
	}

	getDeptos(): void {
		this._general.getDeptos().subscribe((response: any) => {
			this.listDeptos = response;
		});
	}

	getCities(iddepartamento: string): void {
		this._general
			.getCities({ iddepartamento })
			.subscribe((response: any) => {
				this.listCities = response;
			});
	}
}
