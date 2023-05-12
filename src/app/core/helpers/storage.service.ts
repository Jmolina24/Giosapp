import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'currentUser';
const USER_ID = 'user_id';
const ROL_ID = 'rol_id';
const IS_TEMPORAL = 'temporal';

@Injectable({
	providedIn: 'root',
})
export class StorageService {
	constructor() {}

	signOut(): void {
		window.sessionStorage.clear();
	}

	public saveToken(token: string): void {
		window.sessionStorage.removeItem(TOKEN_KEY);
		window.sessionStorage.setItem(TOKEN_KEY, token);
	}

	public getToken(): string | null {
		return sessionStorage.getItem(TOKEN_KEY);
	}

	public saveUser(user: any): void {
		window.sessionStorage.removeItem(USER_KEY);
		window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
	}

	public getUser(): any {
		const user = window.sessionStorage.getItem(USER_KEY);
		if (user) {
			return JSON.parse(user);
		}

		return {};
	}

	public getUserId(): string {
		const user = window.sessionStorage.getItem(USER_ID);
		if (user) {
			return JSON.parse(user);
		}

		return '';
	}

	public saveUserId(userId: string): void {
		window.sessionStorage.removeItem(USER_ID);
		window.sessionStorage.setItem(USER_ID, JSON.stringify(userId));
	}

	public saveRolId(content: string): void {
		window.sessionStorage.removeItem(ROL_ID);
		window.sessionStorage.setItem(ROL_ID, content);
	}

	public getRolID(): any {
		const rol = window.sessionStorage.getItem(ROL_ID);
		if (rol) {
			return JSON.parse(rol);
		}

		return '';
	}

	public saveIsTemporal(content: any): void {
		window.sessionStorage.removeItem(IS_TEMPORAL);
		window.sessionStorage.setItem(IS_TEMPORAL, content);
	}

	public getIsTemporal(): any {
		const isTe = window.sessionStorage.getItem(IS_TEMPORAL);
		if (isTe) {
			return JSON.parse(isTe);
		}

		return false;
	}
}
