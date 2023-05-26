import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs';
import { StorageService } from '../helpers/storage.service';

@Injectable({
	providedIn: 'root',
})
export class ClientsService {
	constructor(private _api: ApiService, private _storage: StorageService) {}

	/**
	 * Función `get(options?: {
	 *   idcliente?: string | number;
	 *   numerodocumento?: 'T' | number;
	 * }): Observable<any[]>`
	 *
	 * Esta función realiza una solicitud GET a través de la API para obtener una lista de clientes con filtros opcionales.
	 * Los filtros se pueden especificar en el parámetro `options`, que es un objeto con las siguientes propiedades:
	 *
	 * @param idcliente (opcional) El ID del cliente para filtrar la lista. Puede ser una cadena o un número. El valor predeterminado es 0.
	 * @param numerodocumento (opcional) El número de documento para filtrar la lista. Puede ser la cadena 'T' para mostrar todos los documentos o un número específico.
	 * El valor predeterminado es 'T'.
	 *
	 * @returns Un Observable que emite un array de objetos, que representa la lista de clientes obtenida de la API.
	 *
	 * @remarks
	 * La función `get` utiliza el método `get` de la instancia `_api` para realizar una solicitud GET a través de la API.
	 * Se construye una URL con los filtros especificados en `options` y se pasa a la función `get` de `_api`.
	 * El resultado de la solicitud se emite como un Observable que contiene un array de objetos representando la lista de clientes.
	 */
	public get({
		idcliente = 0,
		numerodocumento = 'T',
	}: {
		idcliente?: string | number;
		numerodocumento?: 'T' | number;
	} = {}): Observable<any[]> {
		return this._api.get<any[]>(
			`option/list-clientes?idcliente=${idcliente}&numerodocumento=${numerodocumento}`
		);
	}

	/**
	 * Función `bySite(options?: {
	 *   idclientesede?: number;
	 *   idcliente?: string | number;
	 *   idciudad?: string;
	 * }): Observable<any[]>`
	 *
	 * Esta función realiza una solicitud GET a través de la API para obtener una lista de clientes por sitio con filtros opcionales.
	 * Los filtros se pueden especificar en el parámetro `options`, que es un objeto con las siguientes propiedades:
	 *
	 * @param idclientesede (opcional) El ID de la sede del cliente para filtrar la lista. Puede ser un número. El valor predeterminado es 0.
	 * @param idcliente (opcional) El ID del cliente para filtrar la lista. Puede ser una cadena o un número. El valor predeterminado es 0.
	 * @param idciudad (opcional) El ID de la ciudad para filtrar la lista. Puede ser una cadena. El valor predeterminado es '0'.
	 *
	 * @returns Un Observable que emite un array de objetos, que representa la lista de clientes por sitio obtenida de la API.
	 *
	 * @remarks
	 * La función `bySite` utiliza el método `get` de la instancia `_api` para realizar una solicitud GET a través de la API.
	 * Se construye una URL con los filtros especificados en `options` y se pasa a la función `get` de `_api`.
	 * El resultado de la solicitud se emite como un Observable que contiene un array de objetos representando la lista de clientes por sitio.
	 */
	public bySite({
		idclientesede = 0,
		idcliente = 0,
		idciudad = '0',
	}: {
		idclientesede?: number;
		idcliente?: string | number;
		idciudad?: string;
	} = {}): Observable<any[]> {
		return this._api.get<any[]>(
			`option/list-clientes-sedes?idclientesede=${idclientesede}&idcliente=${idcliente}&idciudad=${idciudad}`
		);
	}

	public create(content: {
		idcliente: string;
		idtipodocumento: string;
		razonsocial: string;
		numerodocumento: string;
	}): Observable<any> {
		if (Object.keys(content).some(element => !element)) {
			return;
		}

		return this._api.post('admin/create-customer', {
			...content,
			idusuarioregistra: this._storage.getUserId(),
		});
	}

	public createSede(content: {
		idclientesede: string;
		idcliente: string;
		idtiposede: string;
		idciudad: string;
		nombre: string;
		codigocosto: string;
		direccion: string;
		telefono: string;
		email: string;
		contacto: string;
		barrio: string;
	}): Observable<any> {
		if (Object.keys(content).some(element => !element)) {
			return;
		}

		return this._api.post('admin/create-customer-sede', {
			...content,
			idusuarioregistra: this._storage.getUserId(),
		});
	}

	public getTypesSedes({
		idtiposede = 0,
		estado = 'T',
	}: {
		idtiposede?: string | number;
		estado?: 'T' | string;
	} = {}): Observable<any[]> {
		return this._api.get<any[]>(
			`option/list-tipo-sedes?idtiposede=${idtiposede}&estado=${estado}`
		);
	}
}
