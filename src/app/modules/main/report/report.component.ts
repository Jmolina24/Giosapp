/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FilesService } from 'app/core/helpers/files.service';
import { SweetAlertService } from 'app/core/helpers/sweet-alert.service';
import { ClientsService } from 'app/core/services/clients.service';
import { ServicesService } from 'app/core/services/services.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import * as File from 'file-saver';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-report',
	templateUrl: './report.component.html',
	styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

	roleId = 1;
	isLoading = false;

	listCustomers = [];
	listSites = [];
	listServices = [];
	listStatus = [
		{ key: 'A', value: 'POR ASIGNAR' },
		{ key: 'P', value: 'REALIZADA' },
		{ key: 'G', value: 'ASIGNADA' },
		{ key: 'L', value: 'POR LEGALIZACION' },
		{ key: 'F', value: 'FACTURADA' },
		{ key: 'D', value: 'PAGADA' },
		{ key: 'X', value: 'ANULADA' },
	];

	controlCustomer = new FormControl('');
	filteredOptionsCustomer: Observable<string[]>;

	controlSite = new FormControl('');
	filteredOptionsSites: Observable<string[]>;

	controlService = new FormControl('');
	filteredOptionsServices: Observable<string[]>;

	data = {
		idcliente: '',
		idclientesede: '',
		idservicio: '',
		fechaInicio: '',
		fechaFin: '',
		estado: ''
	};

	constructor(private _file: FilesService, private _client: ClientsService, private _service: ServicesService, private _alert: SweetAlertService) { }

	ngOnInit(): void {

		this.getClients();
		this.getServices();

		this.filteredOptionsCustomer = this.controlCustomer.valueChanges.pipe(
			startWith(''),
			map(value => this._filterCustomer(value || ''))
		);

		this.filteredOptionsSites = this.controlSite.valueChanges.pipe(
			startWith(''),
			map(value => this._filterSites(value || ''))
		);

		this.filteredOptionsServices = this.controlService.valueChanges.pipe(
			startWith(''),
			map(value => this._filterServices(value || ''))
		);
	}


	getClients(): void {
		this._client.get().subscribe((r) => {
			this.listCustomers = r;
		});
	}

	getSites(idcliente: string): void {
		this._client.bySite({ idcliente }).subscribe((response) => {
			this.listSites = response;
		});
	}

	getServices(): void {
		this._service.get().subscribe((r) => {
			this.listServices = r;
		});
	}

	generateExcel(): void {

		const { idcliente, idclientesede, idservicio, fechaInicio, fechaFin, estado } = this.data;

		if ([idcliente, idclientesede, idservicio, fechaInicio, fechaFin].some(r => !r)) {
			this._alert.info({ text: 'Ingrese los datos requeridos', title: 'Datos incompletos' });
			return;
		}

		this.isLoading = true;

		this._file.downloadFile(
			`https://apigiosapp.fly.dev/api/v1/report/report-services?idcliente=${idcliente}&idsedecliente=${idclientesede}&idservicio=${idservicio}&estado=${estado}&fechainicio=${fechaInicio}&fechafin=${fechaFin}&tipo=FA`).subscribe((response: Blob) => {
				File.saveAs(response);
			}, (error: HttpErrorResponse) => {
				this.isLoading = false;
				this._alert.error({ title: 'Error', text: error.message });
			}, () => {
				this.isLoading = false;
			});
	}

	fnSite(idclientesede: any): void {
		if (idclientesede) {
			this.data.idclientesede = idclientesede;
		}
	}

	fnCustomer(idcliente: any): void {
		if (idcliente) {
			this.data.idcliente = idcliente;
		}
	}

	fnService(idservicio: any): void {
		if (idservicio) {
			this.data.idservicio = idservicio;
		}
	}

	private _filterCustomer(value: string): string[] {
		const filterValue = value.toLowerCase();

		return !value ? this.listCustomers : this.listCustomers.filter(option =>
			option.razonsocial.toLowerCase().includes(filterValue)
		);
	}

	private _filterSites(value: string): string[] {
		const filterValue = value.toLowerCase();

		return !value ? this.listSites : this.listSites.filter(option =>
			option.cliensede.toLowerCase().includes(filterValue)
		);
	}

	private _filterServices(value: string): string[] {
		const filterValue = value.toLowerCase();

		return !value ? this.listServices : this.listServices.filter(option =>
			option.nombre.toLowerCase().includes(filterValue)
		);
	}
}
