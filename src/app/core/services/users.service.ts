import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs';
import { StorageService } from '../helpers/storage.service';

@Injectable({
	providedIn: 'root',
})
export class UsersService {
	constructor(private _api: ApiService, private _storage: StorageService) {}

	public get({
		idusuario = 0,
		numerodocumento = 'T',
		idcliente = 0,
		idtercero = 0,
	}: {
		idusuario?: string | number;
		numerodocumento?: 'T' | number;
		idcliente?: string | number;
		idtercero?: string | number;
	} = {}): Observable<any[]> {
		return this._api.get<any[]>(
			`option/list-usuarios?idusuario=${idusuario}&numerodocumento=${numerodocumento}&idcliente=${idcliente}&idtercero=${idtercero}`
		);
	}

	public create(content: {
		idclientesede: string;
		idtercero: string;
		idtipodocumento: string;
		documento: string;
		apellidos: string;
		nombre: string;
		direccion: string;
		telefono: string;
		email: string;
		login: string;
		clave: string;
	}): Observable<any> {
		if (Object.keys(content).some(element => !element)) {
			return;
		}

		return this._api.post('admin/create-admin', {
			...content,
			idrol: '1',
			idusuarioregistra: this._storage.getUserId(),
		});
	}

	public changeStatus(
		idusuario: string,
		status: string = 'A'
	): Observable<any> {
		if (!idusuario) {
			return;
		}

		return this._api.post('admin/user-status/' + status, {
			idusuario,
			idusuarioregistra: this._storage.getUserId(),
		});
	}
}
