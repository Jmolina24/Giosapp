import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor(private _api: ApiService) {}

	signIn(content: { username: string; password: string }): Observable<any> {
		return this._api.post('login/sign', content);
	}
}
