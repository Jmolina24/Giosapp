import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs';
import { StorageService } from '../helpers/storage.service';

@Injectable({
	providedIn: 'root',
})
export class ClientsService {
	constructor(private _api: ApiService, private _storage: StorageService) {}

	public get({
		idcliente = 0,
		numerodocumento = 'T',
	}: {
		idcliente?: string | number;
		numerodocumento?: 'T' | number;
	} = {}): Observable<any[]> {
		return this._api.get<any[]>(
			`option/list-clientes?idcliente=${idcliente}&numerodocumento=${numerodocumento}`
		);
	}

	public bySite({
		idclientesede = 0,
		idcliente = 0,
		idciudad = '0',
	}: {
		idclientesede?: string | number;
		idcliente?: string | number;
		idciudad?: string;
	} = {}): Observable<any[]> {
		return this._api.get<any[]>(
			`option/list-clientes-sedes?idclientesede=${idclientesede}&idcliente=${idcliente}&idciudad=${idciudad}`
		);
	}

	public create(content: {
		idcliente: string;
		idtipodocumento: string;
		razonsocial: string;
		numerodocumento: string;
	}): Observable<any> {
		if (Object.keys(content).some(element => !element)) {
			return;
		}

		return this._api.post('admin/create-customer', {
			...content,
			idusuarioregistra: this._storage.getUserId(),
		});
	}

	public createSede(content: {
		idclientesede: string;
		idcliente: string;
		idtiposede: string;
		idciudad: string;
		nombre: string;
		codigocosto: string;
		direccion: string;
		telefono: string;
		email: string;
		contacto: string;
		barrio: string;
	}): Observable<any> {
		if (Object.keys(content).some(element => !element)) {
			return;
		}

		return this._api.post('admin/create-customer-sede', {
			...content,
			idusuarioregistra: this._storage.getUserId(),
		});
	}

	public getTypesSedes({
		idtiposede = 0,
		estado = 'T',
	}: {
		idtiposede?: string | number;
		estado?: 'T' | string;
	} = {}): Observable<any[]> {
		return this._api.get<any[]>(
			`option/list-tipo-sedes?idtiposede=${idtiposede}&estado=${estado}`
		);
	}
}
