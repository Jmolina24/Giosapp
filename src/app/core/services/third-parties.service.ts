import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs';
import { StorageService } from '../helpers/storage.service';

@Injectable({
	providedIn: 'root',
})
export class ThirdPartiesService {
	constructor(private _api: ApiService, private _storage: StorageService) {}

	public get({
		idservicio = 0,
		estado = 'T',
		numerodocumento = 'T',
	}: {
		idservicio?: string | number;
		numerodocumento?: string | number;
		estado?: 'T' | string;
	} = {}): Observable<any[]> {
		return this._api.get<any[]>(
			`option/list-terceros?idtercero=${idservicio}&numerodocumento=${numerodocumento}&estado=${estado}`
		);
	}

	public create(content: {
		idtercero: string;
		idtipotercero: string;
		idciudad: string;
		idtipodocumento: string;
		documento: string;
		nombre: string;
		direccion: string;
		telefono: string;
		email: string;
	}): Observable<any> {
		if (Object.keys(content).some(element =>  !element)) {
			return;
		}

		return this._api.post('admin/create-tercero', {
			...content,
			idusuarioregistra: this._storage.getUserId(),
		});
	}

	public changeStatus(
		idtercero = '0',
		status: string = 'A'
	): Observable<any> {
		if (!idtercero) {
			return;
		}

		return this._api.post('admin/tercero-status/' + status, {
			idtercero,
			idusuarioregistra: this._storage.getUserId(),
		});
	}

	public getTypes({
		idtipotercero = 0,
		estado = 'T',
	}: {
		idtipotercero?: string | number;
		estado?: 'T' | string;
	} = {}): Observable<any[]> {
		return this._api.get<any[]>(
			`option/list-tipo-terceros?idtipotercero=${idtipotercero}&estado=${estado}`
		);
	}
}
