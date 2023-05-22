import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor(private _api: ApiService) { }

	signIn(content: { username: string; password: string }) {
		return this._api.post('login/sign', content);
	}

	signOut(): void { }
}
