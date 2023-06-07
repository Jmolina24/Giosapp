/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { StorageService } from '../helpers/storage.service';
import { ApiService } from '../api/api.service';

@Injectable({
	providedIn: 'root',
})
export class RatesService {
	constructor(private _api: ApiService, private _storage: StorageService) {}

	public get({
		idterceroservicio = '0',
		idtercero = '0',
		idservicio = '0',
		idciudad = '0',
		estado = 'T',
	}: {
		idterceroservicio?: string;
		idtercero?: string;
		idservicio?: string;
		idciudad?: string;
		estado?: string;
	} = {}): Observable<any> {
		return this._api.get<any[]>(
			`option/list-terceros-servicios?idterceroservicio=${idterceroservicio}&idtercero=${idtercero}&idservicio=${idservicio}&idciudad=${idciudad}&estado=T`
		);
	}

	public changeStatus(idterceroservicio = '0', status: string = 'A'): Observable<any> {
		if (!idterceroservicio) {
			return;
		}

		return this._api.post('admin/tercero-servicio-status/' + status, {
			idterceroservicio,
			idusuarioregistra: this._storage.getUserId(),
		});
	}

	public create(content: {
		idterceroservicio: string;
		idtercero: string;
		idservicio: string;
		idciudad: string;
		valor: string;
   }): Observable<any> {
		if (Object.keys(content).some(element => !element)) {
			return;
		}

		return this._api.post('admin/create-tercero-servicio', {
			...content,
			idusuarioregistra: this._storage.getUserId(),
		});
	}
}
