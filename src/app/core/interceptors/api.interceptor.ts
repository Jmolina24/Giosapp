import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpHeaders,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ErrorService } from '../errors/error.service';
import { StorageService } from '../helpers/storage.service';
import { catchError, mergeMap } from 'rxjs/operators';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
	constructor(
		private errorHandlingService: ErrorService,
		private storage: StorageService
	) {}

	/**
	 * Función `intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>`
	 *
	 * Esta función es utilizada en un interceptor de peticiones HTTP para interceptar y modificar las solicitudes salientes antes de enviarlas al servidor. Recibe dos parámetros:
	 *
	 * @param request: HttpRequest<any> - El objeto HttpRequest que representa la solicitud original que se va a modificar.
	 * @param next: HttpHandler - El objeto HttpHandler que permite enviar la solicitud modificada al siguiente interceptor en la cadena o al servidor si no hay más interceptores.
	 *
	 * @returns Un Observable que emite un objeto HttpEvent<any>, que puede ser una respuesta HTTP, un evento de progreso u otros eventos relacionados con la solicitud.
	 *
	 * @remarks
	 * La función `intercept` utiliza el operador `of` para crear un Observable que emite un valor nulo.
	 * Luego se utiliza el operador `mergeMap` para ejecutar una función que modifica la solicitud original agregando encabezados personalizados.
	 *
	 * La función `getToken` se utiliza para obtener el token de autenticación de la aplicación desde el almacenamiento local.
	 * Este token se agrega como encabezado "tsec" en la solicitud modificada.
	 *
	 * A continuación, se clona la solicitud original y se le asignan los nuevos encabezados y la URL original.
	 * La solicitud modificada se envía al siguiente interceptor o al servidor utilizando el método `handle` del objeto `next`.
	 * El resultado de la solicitud se emite como un Observable.
	 *
	 * Si se produce un error durante el manejo de la solicitud, se utiliza el servicio `errorHandlingService` para manejar el error y
	 * se emite como un Observable utilizando el operador `catchError`.
	 */

	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		return of(null).pipe(
			mergeMap(() => {
				const headers = new HttpHeaders().set(
					'tsec',
					this.storage.getToken() || 'NO TOKEN'
				);
				const modifiedRequest = request.clone({
					headers: headers,
					url: request.url,
				});
				return next
					.handle(modifiedRequest)
					.pipe(
						catchError(error =>
							this.errorHandlingService.handleError(error)
						)
					);
			})
		);
	}
}
