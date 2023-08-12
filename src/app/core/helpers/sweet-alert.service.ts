/* Importar el decorador Injectable de la biblioteca del núcleo de Angular. */
import { Injectable } from '@angular/core';
/* Importa la hoja de estilos para la alerta. */
import 'sweetalert2/src/sweetalert2.scss';

import Swal from 'sweetalert2';
import { SweetAlertResult, SweetAlertOptions } from 'sweetalert2';

/* Esta clase es un servicio que proporciona un método para mostrar un sweetalert. */
@Injectable({
	providedIn: 'root',
})
export class SweetAlertService {
	/**
	 * La función constructora es una función especial que se llama cuando se crea una nueva instancia de la clase
	 * se crea una nueva instancia de la clase.
	 */
	constructor() {}

	/**
	 * Función `show(data: SweetAlertOptions): Promise<SweetAlertResult>`
	 *
	 * Esta función muestra una alerta SweetAlert utilizando los datos proporcionados y devuelve una promesa que se resuelve con el resultado de la alerta.
	 * La función está definida con los siguientes parámetros:
	 *
	 * @param data Un objeto que contiene las opciones de configuración para la alerta SweetAlert.
	 *
	 * @returns Una promesa que se resuelve con el resultado de la alerta SweetAlert.
	 * El resultado es un objeto que contiene propiedades como `value` (el valor de entrada del usuario) y `isConfirmed` (indica si se confirmó la alerta).
	 *
	 * @remarks
	 * La función `show` utiliza la librería SweetAlert para mostrar alertas personalizadas en el navegador.
	 * Se utiliza la función `fire` de SweetAlert para mostrar la alerta con las opciones proporcionadas en el parámetro `data`.
	 * La función `fire` devuelve una promesa que se resuelve con el resultado de la alerta, y se utiliza `await` para esperar a que
	 * la promesa se resuelva antes de devolver el resultado.
	 */
	async show(data: SweetAlertOptions): Promise<SweetAlertResult> {
		return await Swal.fire({
			...data,
		});
	}

	/**
	 * Función `loading(content?: SweetAlertOptions): void`
	 *
	 * Esta función muestra una alerta de carga utilizando las opciones de configuración proporcionadas o las opciones predeterminadas si no se proporciona ningún contenido.
	 * La función no devuelve ningún valor.
	 *
	 * @param content (opcional) Un objeto que contiene las opciones de configuración para la alerta de carga. Si no se proporciona ningún contenido,
	 * se utilizarán las opciones predeterminadas.
	 *
	 * @remarks
	 * La función `loading` utiliza la librería SweetAlert para mostrar una alerta de carga en el navegador. Se utiliza la función `fire` de SweetAlert para mostrar la alerta
	 * con las opciones proporcionadas en el parámetro `content`. Si no se proporciona ningún contenido, se utilizarán las opciones predeterminadas para la alerta de carga.
	 * La alerta de carga muestra un mensaje de título "Cargando" y no permite hacer clic fuera de la alerta ni cerrarla con la tecla de escape.
	 * Además, muestra una barra de progreso y ejecuta la función `Swal.showLoading()` cuando la alerta se abre.
	 */
	loading(content?: SweetAlertOptions): void {
		content = {
			title: 'Cargando',
			allowOutsideClick: false,
			allowEscapeKey: false,
			showConfirmButton: false,
			timerProgressBar: true,
			didOpen: (): void => {
				Swal.showLoading();
			},
		};
		Swal.fire(content);
	}

	/**
	 * Función `select(content?: { title: string; options: any[]; placeholder: string }): Promise<SweetAlertResult>`
	 *
	 * Esta función muestra una alerta SweetAlert con un campo de selección y devuelve una promesa que se resuelve con el resultado de la alerta.
	 * La función está definida con los siguientes parámetros:
	 *
	 * @param content (opcional) Un objeto que contiene las opciones de configuración para la alerta SweetAlert. El objeto debe incluir las propiedades
	 * `title` (el título de la alerta), `options` (un arreglo de opciones para el campo de selección) y
	 * `placeholder` (el texto de marcador de posición para el campo de selección).
	 * Si no se proporciona ningún contenido, se utilizarán las opciones predeterminadas.
	 *
	 * @returns Una promesa que se resuelve con el resultado de la alerta SweetAlert.
	 * El resultado es un objeto que contiene propiedades como `value` (el valor de selección del usuario) y `isConfirmed` (indica si se confirmó la alerta).
	 *
	 * @remarks
	 * La función `select` utiliza la librería SweetAlert para mostrar una alerta con un campo de selección en el navegador.
	 * Se utiliza la función `fire` de SweetAlert con las opciones proporcionadas en el parámetro `content`.
	 * Si no se proporciona ningún contenido, se utilizarán las opciones predeterminadas. La alerta mostrará un título, un campo de selección con las opciones proporcionadas y
	 * botones de confirmación y cancelación.
	 */
	async select(content?: {
		title: string;
		options: any[];
		placeholder: string;
	}): Promise<SweetAlertResult> {
		return await Swal.fire({
			title: content.title,
			input: 'select',
			inputOptions: content.options,
			inputPlaceholder: content.placeholder || 'Seleccione una opción',
			showCancelButton: true,
			confirmButtonText: 'Confirmar',
		});
	}

	/**
	 * Función `success(content: { title: string; text: string }): Promise<SweetAlertResult>`
	 *
	 * Esta función muestra una alerta SweetAlert con un ícono de éxito y devuelve una promesa que se resuelve con el resultado de la alerta.
	 * La función está definida con los siguientes parámetros:
	 *
	 * @param content Un objeto que contiene las opciones de configuración para la alerta SweetAlert.
	 * El objeto debe incluir las propiedades `title` (el título de la alerta) y `text` (el texto de la alerta).
	 *
	 * @returns Una promesa que se resuelve con el resultado de la alerta SweetAlert.
	 * El resultado es un objeto que contiene propiedades como `isConfirmed` (indica si se confirmó la alerta).
	 *
	 * @remarks
	 * La función `success` utiliza la librería SweetAlert para mostrar una alerta con un ícono de éxito en el navegador.
	 * Se utiliza la función `fire` de SweetAlert con las opciones proporcionadas en el parámetro `content`.
	 * La alerta mostrará un título, un texto, un ícono de éxito y un botón de confirmación.
	 */
	async success(content: {
		title: string;
		text: string;
	}): Promise<SweetAlertResult> {
		return await Swal.fire({
			title: content.title,
			text: content.text,
			icon: 'success',
			timer: 5000,
			confirmButtonText: 'Aceptar',
		});
	}

	/**
	 * Función `error(content: { title: string; text: string }): Promise<SweetAlertResult>`
	 *
	 * Esta función muestra una alerta SweetAlert con un ícono de error y devuelve una promesa que se resuelve con el resultado de la alerta.
	 * La función está definida con los siguientes parámetros:
	 *
	 * @param content Un objeto que contiene las opciones de configuración para la alerta SweetAlert.
	 * El objeto debe incluir las propiedades `title` (el título de la alerta) y `text` (el texto de la alerta).
	 *
	 * @returns Una promesa que se resuelve con el resultado de la alerta SweetAlert.
	 * El resultado es un objeto que contiene propiedades como `isConfirmed` (indica si se confirmó la alerta).
	 *
	 * @remarks
	 * La función `error` utiliza la librería SweetAlert para mostrar una alerta con un ícono de error en el navegador.
	 * Se utiliza la función `fire` de SweetAlert con las opciones proporcionadas en el parámetro `content`.
	 * La alerta mostrará un título, un texto, un ícono de error y un botón de confirmación.
	 */
	async error(content: {
		title: string;
		text: string;
	}): Promise<SweetAlertResult> {
		return await Swal.fire({
			title: content.title,
			text: content.text,
			icon: 'error',
			timer: 5000,
			confirmButtonText: 'Aceptar',
		});
	}

	/**
	 * Función `info(content: { title: string; text: string }): Promise<SweetAlertResult>`
	 *
	 * Esta función muestra una alerta SweetAlert con un ícono de información y devuelve una promesa que se resuelve con el resultado de la alerta.
	 * La función está definida con los siguientes parámetros:
	 *
	 * @param content Un objeto que contiene las opciones de configuración para la alerta SweetAlert.
	 * El objeto debe incluir las propiedades `title` (el título de la alerta) y `text` (el texto de la alerta).
	 *
	 * @returns Una promesa que se resuelve con el resultado de la alerta SweetAlert.
	 * El resultado es un objeto que contiene propiedades como `isConfirmed` (indica si se confirmó la alerta).
	 *
	 * @remarks
	 * La función `info` utiliza la librería SweetAlert para mostrar una alerta con un ícono de información en el navegador.
	 * Se utiliza la función `fire` de SweetAlert con las opciones proporcionadas en el parámetro `content`.
	 * La alerta mostrará un título, un texto, un ícono de información y un botón de confirmación.
	 */
	async info(content: {
		title: string;
		text: string;
	}): Promise<SweetAlertResult> {
		return await Swal.fire({
			title: content.title,
			text: content.text,
			icon: 'info',
			timer: 5000,
			confirmButtonText: 'Aceptar',
		});
	}

	/**
	 * Función `confirm(content: { title: string; text: string }): Promise<SweetAlertResult>`
	 *
	 * Esta función muestra una alerta SweetAlert de confirmación y devuelve una promesa que se resuelve con el resultado de la alerta.
	 * La función está definida con los siguientes parámetros:
	 *
	 * @param content Un objeto que contiene las opciones de configuración para la alerta SweetAlert.
	 * El objeto debe incluir las propiedades `title` (el título de la alerta) y `text` (el texto de la alerta).
	 *
	 * @returns Una promesa que se resuelve con el resultado de la alerta SweetAlert.
	 * El resultado es un objeto que contiene propiedades como `isConfirmed` (indica si se confirmó la alerta).
	 *
	 * @remarks
	 * La función `confirm` utiliza la librería SweetAlert para mostrar una alerta de confirmación en el navegador.
	 * Se utiliza la función `fire` de SweetAlert con las opciones proporcionadas en el parámetro `content`.
	 * La alerta mostrará un título, un texto, un ícono de información, botones de confirmación y cancelación,
	 * y también se puede mostrar un botón de negación si se proporciona la propiedad `showDenyButton` en `content`.
	 */
	async confirm(content: {
		title: string;
		text: string;
	}): Promise<SweetAlertResult> {
		return await Swal.fire({
			title: content.title,
			text: content.text,
			icon: 'question',
			showDenyButton: true,
			showCancelButton: false,
			confirmButtonText: 'Confirmar',
			denyButtonText: 'Cancelar',
		});
	}

	/**
	 * Función `input(title: string): Promise<SweetAlertResult>`
	 *
	 * Esta función muestra una alerta SweetAlert con un campo de entrada de texto y devuelve una promesa que se resuelve con el resultado de la alerta.
	 * La función está definida con los siguientes parámetros:
	 *
	 * @param title El título de la alerta SweetAlert.
	 *
	 * @returns Una promesa que se resuelve con el resultado de la alerta SweetAlert.
	 * El resultado es un objeto que contiene propiedades como `value` (el valor de entrada del usuario) y `isConfirmed` (indica si se confirmó la alerta).
	 *
	 * @remarks
	 * La función `input` utiliza la librería SweetAlert para mostrar una alerta con un campo de entrada de texto en el navegador.
	 * Se utiliza la función `fire` de SweetAlert con las opciones proporcionadas en el parámetro `title`.
	 * La alerta mostrará un título, un campo de entrada de texto y botones de confirmación y cancelación.
	 */
	async input(title: string): Promise<SweetAlertResult> {
		return await Swal.fire({
			title: title,
			input: 'text',
			showCancelButton: true,
			confirmButtonText: 'Confirmar',
		});
	}

	/**
	 * Función `range(title: string): Promise<SweetAlertResult>`
	 *
	 * Esta función muestra una alerta SweetAlert con un campo de rango y devuelve una promesa que se resuelve con el resultado de la alerta.
	 * La función está definida con los siguientes parámetros:
	 *
	 * @param title El título de la alerta SweetAlert.
	 *
	 * @returns Una promesa que se resuelve con el resultado de la alerta SweetAlert.
	 * El resultado es un objeto que contiene propiedades como `value` (el valor seleccionado por el usuario) y `isConfirmed` (indica si se confirmó la alerta).
	 *
	 * @remarks
	 * La función `range` utiliza la librería SweetAlert para mostrar una alerta con un campo de rango en el navegador.
	 * Se utiliza la función `fire` de SweetAlert con las opciones proporcionadas en el parámetro `title`.
	 * La alerta mostrará un título, un campo de rango con los límites y el paso especificados, y botones de confirmación y cancelación.
	 */
	async range(title: string): Promise<SweetAlertResult> {
		return await Swal.fire({
			title: title,
			input: 'range',
			inputLabel: 'Your age',
			inputAttributes: {
				min: '0',
				max: '100',
				step: '5',
			},
			inputValue: 25,
		});
	}

	/**
	 * Función `closeAlert(): void`
	 *
	 * Esta función cierra la alerta SweetAlert actual. Utiliza la función `close` de la biblioteca SweetAlert2 para cerrar la alerta.
	 *
	 * @remarks
	 * La función `closeAlert` utiliza la función `close` de la biblioteca SweetAlert2 para cerrar la alerta actualmente visible en el navegador.
	 * Si no hay ninguna alerta abierta, la función no hace nada.
	 */
	closeAlert(): void {
		Swal.close();
	}

	/**
	 * Función `textarea(title: string): Promise<SweetAlertResult>`
	 *
	 * Esta función muestra una alerta SweetAlert con un campo de entrada de text-area y devuelve una promesa que se resuelve con el resultado de la alerta.
	 * La función está definida con los siguientes parámetros:
	 *
	 * @param title El título de la alerta SweetAlert.
	 *
	 * @returns Una promesa que se resuelve con el resultado de la alerta SweetAlert.
	 * El resultado es un objeto que contiene propiedades como `value` (el valor de entrada del usuario) y `isConfirmed` (indica si se confirmó la alerta).
	 *
	 * @remarks
	 * La función `textarea` utiliza la librería SweetAlert para mostrar una alerta con un campo de entrada de texto en el navegador.
	 * Se utiliza la función `fire` de SweetAlert con las opciones proporcionadas en el parámetro `title`.
	 * La alerta mostrará un título, un campo de entrada de texto y botones de confirmación y cancelación.
	 */
	async textarea(title: string): Promise<SweetAlertResult> {
		return await Swal.fire({
			title: title,
			input: 'textarea',
			showCancelButton: true,
			confirmButtonText: 'Confirmar',
		});
	}
}
