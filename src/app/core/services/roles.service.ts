import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
	providedIn: 'root'
})
export class RolesService {
	constructor(private _api: ApiService) { }


	public get({ id = 0, estado = 'T' }: { id?: number, estado?: string } = {}) {
		return this._api.get(`option/list-roles?id=${id}&estado=${estado}`);
	}
}
