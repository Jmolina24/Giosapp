/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor(private _api: ApiService) {}

	async signIn(content: { usuario: string; password: string }): Promise<any> {
		return await this._api.post('login/sign', content);
	}

	async signUp(content: any): Promise<any> {
		return await this._api.post('login/register', content);
	}

	async recoveryPassword(content: { correo: string }): Promise<any> {
		return await this._api.post('login/recoverkey', content);
	}

	async changePassword(content: {
		user_id: number | string;
		clave_nueva: string;
	}): Promise<any> {
		return await this._api.post('login/changePassword', content);
	}

	signOut(): void {}
}
