/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { StorageService } from '../helpers/storage.service';

@Injectable({
	providedIn: 'root',
})
export class ApiService {
	url: string = environment.baseApi;

	constructor(private _storage: StorageService) {}

	async post(path: string, content: any): Promise<any> {
		const requestOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'tsec': this._storage.getToken(),
			},
			body: JSON.stringify(content),
		};
		return await fetch(this.url + path, requestOptions).then(
			(response: any) => response.json()
		);
	}

	async postFile(path: string, content: any): Promise<any> {
		const requestOptions = {
			method: 'POST',
			headers: {
				tsec: this._storage.getToken(),
			},
			body: content,
		};
		return await fetch(this.url + path, requestOptions).then(
			(response: any) => response.json()
		);
	}

	async get(path: string): Promise<any> {
		const headersList = {
			Accept: '*/*',
			tsec: this._storage.getToken(),
		};

		return await fetch(this.url + path, { headers: headersList }).then(
			(response: any) => response.json()
		);
	}
}
