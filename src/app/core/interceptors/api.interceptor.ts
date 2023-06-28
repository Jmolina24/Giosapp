import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpHeaders,
	HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ErrorService } from '../errors/error.service';
import { StorageService } from '../helpers/storage.service';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

	constructor(
		private errorHandlingService: ErrorService,
		private storage: StorageService,
		private _router: Router
	) {}

	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		const headers = new HttpHeaders().set(
			'tsec',
			this.storage.getToken() || 'NO TOKEN'
		);
		const modifiedRequest = request.clone({
			headers: headers,
			url: request.url,
		});

		return next.handle(modifiedRequest).pipe(
			tap((event) => {
				if (event instanceof HttpResponse) {
					const response = event.body;
					if (response && response.name === 'TokenExpiredError') {
						throwError('Token expirado');
						this.storage.signOut();
						this._router.navigate(['/autenticacion/iniciar-sesion']);
					}
				}


			}),
			catchError((error) => {
				this.errorHandlingService.handleError(error);
				throw error;
			})
		);
	}
}
