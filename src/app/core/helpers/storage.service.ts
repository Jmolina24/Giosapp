import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'currentUser';
const USER_ID = 'user_id';
const ROL_ID = 'rol_id';
const IS_TEMPORAL = 'temporal';

/**
 * Clase `StorageService`
 *
 * Este servicio se utiliza para gestionar el almacenamiento de datos en el almacenamiento de sesión del navegador.
 * Proporciona métodos para guardar y obtener el token de autenticación, el usuario actual y otros datos relacionados.
 *
 * @remarks
 * La clase está decorada con el decorador `Injectable` y se proporciona en el nivel raíz (`providedIn: 'root'`),
 * lo que significa que se crea una única instancia del servicio en toda la aplicación.
 *
 * Propiedades:
 * - `TOKEN_KEY: string` - Constante que representa la clave utilizada para almacenar el token de autenticación en el almacenamiento de sesión.
 * - `USER_KEY: string` - Constante que representa la clave utilizada para almacenar el usuario actual en el almacenamiento de sesión.
 * - `USER_ID: string` - Constante que representa la clave utilizada para almacenar el ID del usuario en el almacenamiento de sesión.
 * - `ROL_ID: string` - Constante que representa la clave utilizada para almacenar el ID del rol en el almacenamiento de sesión.
 * - `IS_TEMPORAL: string` - Constante que representa la clave utilizada para almacenar el estado temporal en el almacenamiento de sesión.
 *
 * Métodos:
 * - `signOut(): void` - Limpia el almacenamiento de sesión, eliminando todos los datos almacenados.
 * - `saveToken(token: string): void` - Guarda el token de autenticación en el almacenamiento de sesión.
 * - `getToken(): string | null` - Obtiene el token de autenticación almacenado en el almacenamiento de sesión.
 * - `saveUser(user: any): void` - Guarda el usuario actual en el almacenamiento de sesión.
 * - `getUser(): any` - Obtiene el usuario actual almacenado en el almacenamiento de sesión.
 * - `getUserId(): string` - Obtiene el ID del usuario almacenado en el almacenamiento de sesión.
 * - `saveUserId(userId: string): void` - Guarda el ID del usuario en el almacenamiento de sesión.
 * - `saveRolId(content: string): void` - Guarda el ID del rol en el almacenamiento de sesión.
 * - `getRolID(): any` - Obtiene el ID del rol almacenado en el almacenamiento de sesión.
 * - `saveIsTemporal(content: any): void` - Guarda el estado temporal en el almacenamiento de sesión.
 * - `getIsTemporal(): any` - Obtiene el estado temporal almacenado en el almacenamiento de sesión.
 */
@Injectable({
	providedIn: 'root',
})
export class StorageService {
	constructor() {}

	/**
	 * Limpia el almacenamiento de sesión, eliminando todos los datos almacenados.
	 */

	signOut(): void {
		window.sessionStorage.clear();
	}

	/**
	 * Guarda el token de autenticación en el almacenamiento de sesión.
	 *
	 * @param token El token de autenticación que se va a guardar.
	 */

	public saveToken(token: string): void {
		window.sessionStorage.removeItem(TOKEN_KEY);
		window.sessionStorage.setItem(TOKEN_KEY, token);
	}

	/**
	 * Obtiene el token de autenticación almacenado en el almacenamiento de sesión.
	 *
	 * @returns El token de autenticación, o null si no hay ningún token almacenado.
	 */
	public getToken(): string | null {
		return sessionStorage.getItem(TOKEN_KEY);
	}

	/**
	 * Guarda los datos del usuario en el almacenamiento de sesión.
	 *
	 * @param user Los datos del usuario que se van a guardar.
	 */
	public saveUser(user: any): void {
		window.sessionStorage.removeItem(USER_KEY);
		window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
	}

	/**
	 * Obtiene los datos del usuario almacenados en el almacenamiento de sesión.
	 *
	 * @returns Los datos del usuario, o un objeto vacío si no hay datos de usuario almacenados.
	 */
	public getUser(): any {
		const user = window.sessionStorage.getItem(USER_KEY);
		if (user) {
			return JSON.parse(user);
		}

		return {};
	}

	/**
	 * Obtiene el ID de usuario almacenado en el almacenamiento de sesión.
	 *
	 * @returns El ID de usuario, o una cadena vacía si no hay ningún ID de usuario almacenado.
	 */
	public getUserId(): string {
		const user = window.sessionStorage.getItem(USER_ID);
		if (user) {
			return JSON.parse(user);
		}

		return '';
	}

	/**
	 * Guarda el ID de usuario en el almacenamiento de sesión.
	 *
	 * @param userId El ID de usuario que se va a guardar.
	 */
	public saveUserId(userId: string): void {
		window.sessionStorage.removeItem(USER_ID);
		window.sessionStorage.setItem(USER_ID, JSON.stringify(userId));
	}

	/**
	 * Guarda el ID de rol en el almacenamiento de sesión.
	 *
	 * @param content El ID de rol que se va a guardar.
	 */
	public saveRolId(content: string): void {
		window.sessionStorage.removeItem(ROL_ID);
		window.sessionStorage.setItem(ROL_ID, content);
	}

	/**
	 * Obtiene el ID de rol almacenado en el almacenamiento de sesión.
	 *
	 * @returns El ID de rol, o una cadena vacía si no hay ningún ID de rol almacenado.
	 */
	public getRolID(): any {
		const rol = window.sessionStorage.getItem(ROL_ID);
		if (rol) {
			return JSON.parse(rol);
		}

		return '';
	}

	public getMenu(): any {
		const menu = this.getUser().menu;
		if (menu) {
			return JSON.parse(menu);
		}

		return '';
	}
}
