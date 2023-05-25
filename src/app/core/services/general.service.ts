import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs';
import { StorageService } from '../helpers/storage.service';

@Injectable({
	providedIn: 'root',
})
export class GeneralService {
	constructor(private _api: ApiService, private _storage: StorageService) { }

	/**
	 * Función `getDeptos(options?: {
	 *   iddepartamento?: string | number;
	 *   codigodane?: 'T' | number;
	 * }): Observable<any[]>`
	 *
	 * Esta función realiza una solicitud GET a través de la API para obtener una lista de departamentos con filtros opcionales.
	 * Los filtros se pueden especificar en el parámetro `options`, que es un objeto con las siguientes propiedades:
	 *
	 * @param iddepartamento (opcional) El ID del departamento para filtrar la lista. Puede ser una cadena o un número. El valor predeterminado es 0.
	 * @param codigodane (opcional) El código DANE para filtrar la lista. Puede ser la cadena 'T' para mostrar todos los departamentos o un número específico.
	 * El valor predeterminado es 'T'.
	 *
	 * @returns Un Observable que emite un array de objetos, que representa la lista de departamentos obtenida de la API.
	 *
	 * @remarks
	 * La función `getDeptos` utiliza el método `get` de la instancia `_api` para realizar una solicitud GET a través de la API.
	 * Se construye una URL con los filtros especificados en `options` y se pasa a la función `get` de `_api`.
	 * El resultado de la solicitud se emite como un Observable que contiene un array de objetos representando la lista de departamentos.
	 */
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

	/**
	 * Función `getCities(options?: {
	 *   idciudad?: number;
	 *   iddepartamento?: string | number;
	 *   codigodane?: 'T' | number;
	 * }): Observable<any[]>`
	 *
	 * Esta función realiza una solicitud GET a través de la API para obtener una lista de ciudades con filtros opcionales.
	 * Los filtros se pueden especificar en el parámetro `options`, que es un objeto con las siguientes propiedades:
	 *
	 * @param idciudad (opcional) El ID de la ciudad para filtrar la lista. Puede ser un número. El valor predeterminado es 0.
	 * @param iddepartamento (opcional) El ID del departamento para filtrar la lista. Puede ser una cadena o un número. El valor predeterminado es 0.
	 * @param codigodane (opcional) El código DANE para filtrar la lista. Puede ser la cadena 'T' para mostrar todas las ciudades o un número específico.
	 * El valor predeterminado es 'T'.
	 *
	 * @returns Un Observable que emite un array de objetos, que representa la lista de ciudades obtenida de la API.
	 *
	 * @remarks
	 * La función `getCities` utiliza el método `get` de la instancia `_api` para realizar una solicitud GET a través de la API.
	 * Se construye una URL con los filtros especificados en `options` y se pasa a la función `get` de `_api`.
	 * El resultado de la solicitud se emite como un Observable que contiene un array de objetos representando la lista de ciudades.
	 */
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
		sigla = 0
	}: {
		idtipodocumento?: string | number;
		sigla?: 'T' | number;
	} = {}): Observable<any[]> {
		return this._api.get<any[]>(
			`option/list-tipodocumentos?tipodocumento=${idtipodocumento}&sigla=${sigla}`
		);
	}

	public getMeasuringUnits({
		idunidad_medida = 0,
		estado = 0
	}: {
		idunidad_medida?: string | number;
		estado?: 'T' | number;
	} = {}): Observable<any[]> {
		return this._api.get<any[]>(
			`option/list-unidad-medidas?idunidad_medida=${idunidad_medida}&estado=${estado}`
		);
	}

	public createMeasurementUnit(content: {
		nombre: string;
		prefijo: string;
	}): Observable<any> {

		if (content.nombre || content.prefijo) {
			return;
		}

		return this._api.post(`admin/create-unidad-medidas`, {
			...content,
			idunidad: '0',
			idusuarioregistra: this._storage.getUserId()
		});
	}

	public changeStatusMeasurementUni(idunidad = '0', status: string = 'A'): Observable<any> {
		if (idunidad) {
			return;
		}

		return this._api.post(`admin/unidad-medida-status/` + status, {
			idunidad,
			idusuarioregistra: this._storage.getUserId()
		});
	}
}
