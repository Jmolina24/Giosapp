import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs';
import { StorageService } from '../helpers/storage.service';

@Injectable({
	providedIn: 'root',
})
export class RolesService {
	constructor(private _api: ApiService, private _storage: StorageService) {}

	public get({
		id = 0,
		estado = 'T',
	}: { id?: number; estado?: string } = {}): Observable<any> {
		return this._api.get<any[]>(
			`option/list-roles?id=${id}&estado=${estado}`
		);
	}

	public changeStatus(idrol = '0', status: string = 'A'): Observable<any> {
		if (!idrol) {
			return;
		}

		return this._api.post('admin/role-status/' + status, {
			idrol,
			idusuarioregistra: this._storage.getUserId(),
		});
	}

	public create(content: {
		idrol: string;
		nombre: string;
		menu: any[];
		tipo: string;
		crear: string;
		editar: string;
		detalle: string;
		ver: string;
		modificarestado: string;
	}): Observable<any> {
		if (Object.keys(content).some(element => !element)) {
			return;
		}

		return this._api.post('admin/create-rol', {
			...content,
			menu: JSON.stringify(content.menu),
			idusuarioregistra: this._storage.getUserId(),
		});
	}
}
