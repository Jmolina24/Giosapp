import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ErrorService {

	handleError(error: HttpErrorResponse) {
		return throwError(error);
	}
}
