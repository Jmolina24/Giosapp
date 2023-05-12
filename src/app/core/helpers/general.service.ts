import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class GeneralService {
	constructor() {}

	compareTwoWords(passwordOne: string, passwordTwo: string): boolean {
		return !passwordOne || !passwordTwo || passwordOne !== passwordTwo;
	}

	verifyPassword(password): boolean {
		return (
			/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/g.exec(password) !==
				null || undefined
		);
	}
}
