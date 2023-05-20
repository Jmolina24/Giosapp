import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
	providedIn: 'root'
})
export class GeneralService {

	constructor(private _api: ApiService) { }

	public getDeptos({ iddepartamento = 0, codigodane = 'T' }: { iddepartamento ?: string | number, codigodane?: 'T' | number } = {}) {
		return this._api.get(`option/list-departamentos?iddepartamento=${iddepartamento}&codigodane=${codigodane}`)
	}

	public getCities({ idciudad = 0, iddepartamento = 0, codigodane = 'T' }: { idciudad?: number, iddepartamento ?: string | number, codigodane?: 'T' | number } = {}) {
		return this._api.get(`option/list-ciudades?idciudad=${idciudad}&iddepartamento=${iddepartamento}&codigodane=${codigodane}`)
	}
}
