import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs';
import { StorageService } from '../helpers/storage.service';

@Injectable({
	providedIn: 'root',
})
export class OrdersService {
	constructor(private _api: ApiService, private _storage: StorageService) { }

	public get({
		idorden = 0,
		idcliente = '0',
		idclientesede = '0',
		estado = 'T',
	}: {
		idorden?: string | number;
		idcliente?: string;
		idclientesede?: string;
		estado?: 'T' | string;
	} = {}): Observable<any[]> {
		return this._api.get<any[]>(
			`option/list-ordenes?idorden=${idorden}&idcliente=${idcliente}&idclientesede=${idclientesede}&estado=${estado}`
		);
	}

	public create(content: {
		idorden: string,
		idtipoorden: string,
		idclientesede: string,
		fechaentrega: string,
		horaentrega: string,
		observacion: string
	}): Observable<any> {
		if (!content) {
			return;
		}

		return this._api.post('admin/create-orden', {
			...content,
			idusuarioregistra: this._storage.getUserId(),
		});
	}

	public changeStatus(
		idorden = '0',
		status: string = 'A'
	): Observable<any> {
		if (!idorden) {
			return;
		}

		return this._api.post('admin/orden-status/' + status, {
			idorden,
			idusuarioregistra: this._storage.getUserId(),
		});
	}

	public getDetails({
		iddetalleorden = '0',
		idorden = 0,
		idcliente = '0',
		idclientesede = '0',
		idtercero = '0',
		estado = 'T',
	}: {
		iddetalleorden?: string;
		idorden?: string | number;
		idcliente?: string;
		idclientesede?: string;
		idtercero?: string;
		estado?: 'T' | string;
	} = {}): Observable<any[]> {
		return this._api.get<any[]>(
			`option/list-ordenes?iddetalleorden=${iddetalleorden}&idorden=${idorden}&idcliente=${idcliente}&idclientesede=${idclientesede}&idtercero${idtercero}&estado=${estado}`
		);
	}

	public createDetail(content: {
		iddetalleorden: string,
		idorden: string,
		idservicio: string,
		cantidad: string,
		referencia: string,
		observacion: string
   }): Observable<any> {
		if (!content) {
			return;
		}

		return this._api.post('admin/create-orden-detalle', {
			...content,
			idusuarioregistra: this._storage.getUserId(),
		});
	}

	public changeStatusDetail(
		iddetalleorden = '0',
		status: string = 'A'
	): Observable<any> {
		if (!iddetalleorden) {
			return;
		}

		return this._api.post('admin/orden-detalle-status/' + status, {
			iddetalleorden,
			idusuarioregistra: this._storage.getUserId(),
		});
	}

	public getTypes({
		idtipoorden = 0,
		estado = 'T',
	}: {
		idtipoorden?: string | number;
		estado?: 'T' | string;
	} = {}): Observable<any[]> {
		return this._api.get<any[]>(
			`option/list-tipo-ordenes?idtipoorden=${idtipoorden}&estado=${estado}`
		);
	}

	public createType(content: {
		idtipoorden: string;
		nombre: string;
	}): Observable<any> {
		if (!content.nombre) {
			return;
		}

		return this._api.post('admin/create-tipo-orden', {
			...content,
			idusuarioregistra: this._storage.getUserId(),
		});
	}

	public changeStatusType(
		idtipoorden = '0',
		status: string = 'A'
	): Observable<any> {
		if (!idtipoorden) {
			return;
		}

		return this._api.post('admin/tipo-orden-status/' + status, {
			idtipoorden,
			idusuarioregistra: this._storage.getUserId(),
		});
	}
}
