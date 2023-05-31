/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs';
import { StorageService } from '../helpers/storage.service';

@Injectable({
	providedIn: 'root',
})
export class GeneralService {
	constructor(private _api: ApiService, private _storage: StorageService) {}

	public getDeptos({
		iddepartamento = 0,
		codigodane = 'T',
	}: {
		iddepartamento?: string | number;
		codigodane?: 'T' | number;
	} = {}): Observable<any[]> {
		return this._api.get<any[]>(
			`option/list-departamentos?iddepartamento=${iddepartamento}&codigodane=${codigodane}`
		);
	}

	public getCities({
		idciudad = 0,
		iddepartamento = 0,
		codigodane = 'T',
	}: {
		idciudad?: number;
		iddepartamento?: string | number;
		codigodane?: 'T' | number;
	} = {}): Observable<any[]> {
		return this._api.get<any[]>(
			`option/list-ciudades?idciudad=${idciudad}&iddepartamento=${iddepartamento}&codigodane=${codigodane}`
		);
	}

	public getTypesDocuments({
		idtipodocumento = 0,
		sigla = 'T',
	}: {
		idtipodocumento?: string | number;
		sigla?: 'T' | number;
	} = {}): Observable<any[]> {
		return this._api.get<any[]>(
			`option/list-tipodocumentos?idtipodocumento=${idtipodocumento}&sigla=${sigla}`
		);
	}

	public getMeasuringUnits({
		idunidad_medida = 0,
		estado = 'T',
	}: {
		idunidad_medida?: string | number;
		estado?: 'T' | number;
	} = {}): Observable<any[]> {
		return this._api.get<any[]>(
			`option/list-unidad-medidas?idunidad_medida=${idunidad_medida}&estado=${estado}`
		);
	}

	public createMeasurementUnit(content: {
		idunidad: string;
		nombre: string;
		prefijo: string;
	}): Observable<any> {
		if (!content.nombre || !content.prefijo) {
			return;
		}

		return this._api.post('admin/create-unidad-medida', {
			...content,
			idusuarioregistra: this._storage.getUserId(),
		});
	}

	public changeStatusMeasurementUnits(
		idunidad = '0',
		status: string = 'A'
	): Observable<any> {
		if (!idunidad) {
			return;
		}

		return this._api.post('admin/unidad-medida-status/' + status, {
			idunidad,
			idusuarioregistra: this._storage.getUserId(),
		});
	}
}
