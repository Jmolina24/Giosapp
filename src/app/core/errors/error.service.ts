import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ErrorService {
	/**
	 * Maneja el error de una respuesta HTTP.
	 *
	 * @param error El objeto HttpErrorResponse que representa el error.
	 * @returns Un observable que emite el error recibido.
	 */
	handleError(error: HttpErrorResponse): Observable<never> {
		return throwError(error);
	}
}
