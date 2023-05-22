import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpHeaders
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ErrorService } from '../errors/error.service';
import { StorageService } from '../helpers/storage.service';
import { environment } from 'environments/environment';
import { catchError, mergeMap } from 'rxjs/operators';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
	constructor(private errorHandlingService: ErrorService, private storage: StorageService) { }

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return of(null).pipe(
			mergeMap(() => {
				const headers = new HttpHeaders().set('tsec', this.storage.getToken() || 'NO TOKEN');
				const modifiedRequest = request.clone({ headers: headers, url: request.url });
				return next.handle(modifiedRequest)
					.pipe(catchError(error => this.errorHandlingService.handleError(error)));
			})
		)
	}
}
