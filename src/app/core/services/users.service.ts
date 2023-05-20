import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
	providedIn: 'root'
})
export class UsersService {

	constructor(private _api: ApiService) { }


	public get({ idusuario = 0, numerodocumento = 'T', idcliente = 0, idtercero = 0 }: { idusuario?: string | number, numerodocumento?: 'T' | number, idcliente?: string | number, idtercero?: string | number } = {}) {
		return this._api.get(`option/list-usuarios?idusuario=${idusuario}&numerodocumento=${numerodocumento}&idcliente=${idcliente}&idtercero=${idtercero}`);
	}
}
