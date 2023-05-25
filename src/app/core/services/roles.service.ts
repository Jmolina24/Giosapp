import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs';
import { StorageService } from '../helpers/storage.service';

@Injectable({
	providedIn: 'root',
})
export class RolesService {
	constructor(private _api: ApiService, private _storage: StorageService) {}

	/**
	 * Función `get(options?: {
	 *   idusuario?: string | number;
	 *   numerodocumento?: 'T' | number;
	 *   idcliente?: string | number;
	 *   idtercero?: string | number;
	 * }): Observable<any[]>`
	 *
	 * Esta función realiza una solicitud GET a través de la API para obtener una lista de usuarios con filtros opcionales.
	 * Los filtros se pueden especificar en el parámetro `options`, que es un objeto con las siguientes propiedades:
	 *
	 * @param idusuario (opcional) El ID del usuario para filtrar la lista. Puede ser una cadena o un número.
	 * @param numerodocumento (opcional) El número de documento para filtrar la lista. Puede ser la cadena 'T' para mostrar todos los usuarios o un número específico.
	 * @param idcliente (opcional) El ID del cliente para filtrar la lista. Puede ser una cadena o un número.
	 * @param idtercero (opcional) El ID del tercero para filtrar la lista. Puede ser una cadena o un número.
	 *
	 * @returns Un Observable que emite un array de objetos, que representa la lista de usuarios obtenida de la API.
	 *
	 * @remarks
	 * La función `get` utiliza el método `get` de la instancia `_api` para realizar una solicitud GET a través de la API.
	 * Se construye una URL con los filtros especificados en `options` y se pasa a la función `get` de `_api`.
	 * El resultado de la solicitud se emite como un Observable que contiene un array de objetos representando la lista de usuarios.
	 */
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
		menu: string;
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
			idusuarioregistra: this._storage.getUserId(),
		});
	}
}
