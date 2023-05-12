import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
	providedIn: 'root',
})
export class GeneralService {
	constructor(private _api: ApiService) {}

	async getPlanByKey(key: string = 'T'): Promise<any> {
		return await this._api.get('option/plan/' + key);
	}

	async getTypesDocuments(): Promise<any> {
		return await this._api.get('option/tipoDocumentos');
	}

	async getGenres(): Promise<any> {
		return await this._api.get('option/generos');
	}

	async uploadFile(bodyContent: FormData): Promise<any> {
		return await this._api.postFile('upload/files', bodyContent);
	}

	async getUsers(): Promise<any> {
		return await this._api.get('option/listCustomer');
	}
}
