import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { StorageService } from '../helpers/storage.service';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { ErrorService } from '../errors/error.service';

@Injectable({
	providedIn: 'root',
})
export class ApiService {

	private apiUrl = environment.baseApi;

	constructor(private http: HttpClient, private error: ErrorService) { }

	public post<R, T>(url: string, data?: T | any): Observable<HttpResponse<R | any>> {
		url = this.apiUrl + url
		return this.http.post<R | any>(url, data).pipe(catchError(error => this.error.handleError(error)));
	}

	public get<T>(url: string): Observable<HttpResponse<T | any>> {
		url = this.apiUrl + url
		return this.http.get<T | any>(url).pipe(catchError(error => this.error.handleError(error)));
	}

	public put<R, T>(url: string, data?: T | any): Observable<HttpResponse<R | any>> {
		url = this.apiUrl + url
		return this.http.put<R | any>(url, data).pipe(catchError(error => this.error.handleError(error)));
	}

	public delete<T>(url: string): Observable<HttpResponse<T | any>> {
		url = this.apiUrl + url
		return this.http.delete<T | any>(url).pipe(catchError(error => this.error.handleError(error)));
	}
}
