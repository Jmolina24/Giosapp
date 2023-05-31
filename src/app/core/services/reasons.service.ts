import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';
import { StorageService } from '../helpers/storage.service';

@Injectable({
	providedIn: 'root',
})
export class ReasonsService {
	constructor(private _api: ApiService, private _storage: StorageService) {}

	public get({
		idmotivorechazo = 0,
		estado = 'T',
	}: {
		idmotivorechazo?: string | number;
		estado?: 'T' | number;
	} = {}): Observable<any[]> {
		return this._api.get<any[]>(
			`option/list-motivos?idmotivorechazo=${idmotivorechazo}&estado=${estado}`
		);
	}

	public create({
		idmotivorechazo = '0',
		nombre,
	}: {
		idmotivorechazo?: string;
		nombre: string;
	}): Observable<any> {
		if (!nombre) {
			return;
		}

		return this._api.post('admin/create-motivo-rechazo', {
			idmotivorechazo,
			nombre,
			idusuarioregistra: this._storage.getUserId(),
		});
	}

	changeStatus(idmotivorechazo = '0', status: string = 'A'): Observable<any> {
		if (!idmotivorechazo) {
			return;
		}

		return this._api.post('admin/motivo-rechazo-status/' + status, {
			idmotivorechazo,
			idusuarioregistra: this._storage.getUserId(),
		});
	}
}
