import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class FilesService {
	constructor() {}

	static convertFileToBase64(file: File, callback: (arg: any) => any): void {
		const reader = new FileReader();
		// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
		reader.onload = (event: any) => callback(event);
		reader.readAsDataURL(file);
	}
}
