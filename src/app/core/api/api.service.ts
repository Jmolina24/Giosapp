import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ErrorService } from '../errors/error.service';

@Injectable({
	providedIn: 'root',
})
export class ApiService {
	private apiUrl = environment.baseApi;

	constructor(private http: HttpClient, private error: ErrorService) {}

	/**
	 * Función `post<R, T>(url: string, data?: T | any): Observable<R | any>`
	 *
	 * Esta función realiza una solicitud HTTP POST a una URL específica y devuelve un Observable que emite la respuesta del servidor.
	 * La función está definida con los siguientes parámetros:
	 *
	 * - `url` (tipo: `string`): La URL a la cual se realizará la solicitud POST. La URL se concatenará con la URL base `apiUrl` antes de hacer la solicitud.
	 * - `data` (opcional, tipo: `T | any`): Los datos que se enviarán en el cuerpo de la solicitud. Puede ser de tipo genérico `T` o cualquier otro tipo.
	 *
	 * @param url Una cadena que representa la URL a la cual se realizará la solicitud POST.
	 * @param data (opcional) Los datos que se enviarán en el cuerpo de la solicitud. Puede ser de cualquier tipo o estar ausente.
	 *
	 * @returns Un objeto Observable que emite la respuesta del servidor. El tipo de datos emitido es genérico y puede ser de tipo `R` o cualquier otro tipo.
	 *
	 * @remarks
	 * La función `post` realiza una solicitud HTTP POST utilizando el método `post` del servicio `http` proporcionado. A continuación, se aplican los siguientes pasos:
	 *
	 * 1. La URL se construye concatenando la URL base `apiUrl` con la URL proporcionada como parámetro.
	 * 2. Se realiza la solicitud POST utilizando el método `post` del servicio `http` con la URL y los datos proporcionados.
	 * 4. El operador `catchError` se utiliza para capturar cualquier error que ocurra durante la solicitud y delegarlo al manejador de errores `error.handleError()`.
	 */
	public post<R, T>(url: string, data?: T | any): Observable<R | any> {
		url = this.apiUrl + url;
		return this.http.post<R | any>(url, data).pipe(
			catchError(error => this.error.handleError(error))
		);
	}

	/**
	 * Función `get<T>(url: string): Observable<T | any>`
	 *
	 * Esta función realiza una solicitud HTTP GET a una URL específica y devuelve un Observable que emite la respuesta del servidor.
	 * La función está definida con los siguientes parámetros:
	 *
	 * @param url Una cadena que representa la URL a la cual se realizará la solicitud GET. La URL se concatenará con la URL base `apiUrl` antes de hacer la solicitud.
	 *
	 * @returns Un objeto Observable que emite la respuesta del servidor. El tipo de datos emitido es genérico y puede ser de tipo `T` o cualquier otro tipo.
	 *
	 * @remarks
	 * La función `get` realiza una solicitud HTTP GET utilizando el método `get` del servicio `http` proporcionado. A continuación, se aplican los siguientes pasos:
	 *
	 * 1. La URL se construye concatenando la URL base `apiUrl` con la URL proporcionada como parámetro.
	 * 2. Se realiza la solicitud GET utilizando el método `get` del servicio `http` con la URL.
	 * 4. El operador `catchError` se utiliza para capturar cualquier error que ocurra durante la solicitud y delegarlo al manejador de errores `error.handleError()`.
	 */
	public get<T>(url: string): Observable<T | any> {
		url = this.apiUrl + url;
		return this.http.get<T | any>(url).pipe(
			catchError(error => this.error.handleError(error))
		);
	}

	/**
	 * Función `put<R, T>(url: string, data?: T | any): Observable<R | any>`
	 *
	 * Esta función realiza una solicitud HTTP PUT a una URL específica y devuelve un Observable que emite la respuesta del servidor.
	 * La función está definida con los siguientes parámetros:
	 *
	 * @param url Una cadena que representa la URL a la cual se realizará la solicitud PUT. La URL se concatenará con la URL base `apiUrl` antes de hacer la solicitud.
	 * @param data (opcional) Los datos que se enviarán en el cuerpo de la solicitud. Puede ser de tipo genérico `T` o cualquier otro tipo.
	 *
	 * @returns Un objeto Observable que emite la respuesta del servidor. El tipo de datos emitido es genérico y puede ser de tipo `R` o cualquier otro tipo.
	 *
	 * @remarks
	 * La función `put` realiza una solicitud HTTP PUT utilizando el método `put` del servicio `http` proporcionado. A continuación, se aplican los siguientes pasos:
	 *
	 * 1. La URL se construye concatenando la URL base `apiUrl` con la URL proporcionada como parámetro.
	 * 2. Se realiza la solicitud PUT utilizando el método `put` del servicio `http` con la URL y los datos proporcionados.
	 * 4. El operador `catchError` se utiliza para capturar cualquier error que ocurra durante la solicitud y delegarlo al manejador de errores `error.handleError()`.
	 */
	public put<R, T>(url: string, data?: T | any): Observable<R | any> {
		url = this.apiUrl + url;
		return this.http.put<R | any>(url, data).pipe(
			catchError(error => this.error.handleError(error))
		);
	}

	/**
	 * Función `delete<T>(url: string): Observable<T | any>`
	 *
	 * Esta función realiza una solicitud HTTP DELETE a una URL específica y devuelve un Observable que emite la respuesta del servidor.
	 * La función está definida con los siguientes parámetros:
	 *
	 * @param url Una cadena que representa la URL a la cual se realizará la solicitud DELETE. La URL se concatenará con la URL base `apiUrl` antes de hacer la solicitud.
	 *
	 * @returns Un objeto Observable que emite la respuesta del servidor. El tipo de datos emitido es genérico y puede ser de tipo `T` o cualquier otro tipo.
	 *
	 * @remarks
	 * La función `delete` realiza una solicitud HTTP DELETE utilizando el método `delete` del servicio `http` proporcionado. A continuación, se aplican los siguientes pasos:
	 *
	 * 1. La URL se construye concatenando la URL base `apiUrl` con la URL proporcionada como parámetro.
	 * 2. Se realiza la solicitud DELETE utilizando el método `delete` del servicio `http` con la URL.
	 * 4. El operador `catchError` se utiliza para capturar cualquier error que ocurra durante la solicitud y delegarlo al manejador de errores `error.handleError()`.
	 */
	public delete<T>(url: string): Observable<T | any> {
		url = this.apiUrl + url;
		return this.http.delete<T | any>(url).pipe(
			catchError(error => this.error.handleError(error))
		);
	}

	public postFile<T>(url: string, content: FormData): Observable<T | any> {
		url = this.apiUrl + url;
		return this.http.post(url, content).pipe(
			catchError(error => this.error.handleError(error))
			);
	}
}
