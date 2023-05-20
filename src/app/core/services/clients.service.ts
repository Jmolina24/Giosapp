import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
	providedIn: 'root'
})
export class ClientsService {

	constructor(private _api: ApiService) { }


	public get({ idcliente = 0, numerodocumento = 'T' }: { idcliente?: string | number, numerodocumento?: 'T' | number } = {}) {
		return this._api.get(`option/list-clientes?idcliente=${idcliente}&numerodocumento=${numerodocumento}`);
	}

	public bySite({ idclientesede = 0, idcliente = 0, idciudad = '0' }: { idclientesede?: number, idcliente?: string | number, idciudad?: string } = {}) {
		return this._api.get(`option/list-clientes-sedes?idclientesede=${idclientesede}&idcliente=${idcliente}&idciudad=${idciudad}`);
	}
}
