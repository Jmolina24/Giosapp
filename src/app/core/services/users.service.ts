import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs';
import { StorageService } from '../helpers/storage.service';

@Injectable({
	providedIn: 'root',
})
export class UsersService {
	constructor(private _api: ApiService, private _storage: StorageService) { }

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
	 * @param idusuario (opcional) El ID del usuario para filtrar la lista. Puede ser una cadena o un número. El valor predeterminado es 0.
	 * @param numerodocumento (opcional) El número de documento para filtrar la lista.
	 * Puede ser la cadena 'T' para mostrar todos los usuarios o un número específico. El valor predeterminado es 'T'.
	 * @param idcliente (opcional) El ID del cliente para filtrar la lista. Puede ser una cadena o un número. El valor predeterminado es 0.
	 * @param idtercero (opcional) El ID del tercero para filtrar la lista. Puede ser una cadena o un número. El valor predeterminado es 0.
	 *
	 * @returns Un Observable que emite un array de objetos, que representa la lista de usuarios obtenida de la API.
	 *
	 * @remarks
	 * La función `get` utiliza el método `get` de la instancia `_api` para realizar una solicitud GET a través de la API.
	 * Se construye una URL con los filtros especificados en `options` y se pasa a la función `get` de `_api`.
	 * El resultado de la solicitud se emite como un Observable que contiene un array de objetos representando la lista de usuarios.
	 */

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

	public createAdmin(content: {
		idclientesede: string,
		idtercero: string,
		idtipodocumento: string,
		documento: string,
		apellidos: string,
		nombre: string,
		direccion: string,
		telefono: string,
		email: string,
		login: string,
		clave: string,
	}): Observable<any> {

		if (Object.keys(content).some((element) => !element)) {
			return;
		}

		return this._api.post(`admin/create-admin`, {
			...content,
			idusuario: "0",
			idrol: "1",
			idusuarioregistra: this._storage.getUserId()
		});
	}

	public changeStatus(idusuario: string, status: string = 'A'): Observable<any> {
		if (idusuario) {
			return;
		}

		return this._api.post(`admin/user-status/` + status, {
			idusuario,
			idusuarioregistra: this._storage.getUserId()
		});
	}
}
