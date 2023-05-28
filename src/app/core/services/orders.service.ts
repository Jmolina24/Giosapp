import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs';
import { StorageService } from '../helpers/storage.service';

@Injectable({
	providedIn: 'root',
})
export class OrdersService {
	constructor(private _api: ApiService, private _storage: StorageService) {}

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
