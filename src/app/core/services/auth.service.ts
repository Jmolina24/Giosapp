import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor(private _api: ApiService) {}

	/**
	 * Realiza una solicitud de inicio de sesión enviando las credenciales del usuario.
	 *
	 * @param content Objeto que contiene el nombre de usuario y la contraseña.
	 * @returns Un observable que emite la respuesta de la solicitud de inicio de sesión.
	 */
	signIn(content: { username: string; password: string }): Observable<any> {
		return this._api.post('login/sign', content);
	}
}
