import { Injectable } from '@angular/core';

import * as XLSX from 'xlsx';
import { ApiService } from '../api/api.service';
import { Observable, forkJoin } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import * as File from 'file-saver';

import * as jszip from 'jszip';
import { SweetAlertService } from './sweet-alert.service';
import { switchMap } from 'rxjs/operators';

const EXCEL_TYPE =
	'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
	providedIn: 'root',
})
export class FilesService {
	constructor(
		private _api: ApiService,
		private _http: HttpClient,
		private _alert: SweetAlertService
	) {}

	public exportAsExcelFile(
		data: any[],
		excelFileName: string = 'reporte',
		sheetName: string = 'reporte_contenido'
	): void {
		const worksheet = XLSX.utils.json_to_sheet(data);

		const workbook = XLSX.utils.book_new();

		XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

		XLSX.writeFile(
			workbook,
			excelFileName + '_exporte_' + new Date().getTime() + EXCEL_EXTENSION
		);
	}

	upload(bodyContent: FormData): Observable<any> {
		return this._api.postFile('upload/files', bodyContent);
	}

	download(url: string): void {
		this._http
			.get(url, { responseType: 'blob' })
			.subscribe((response: Blob) => {
				File.saveAs(response);
			});
	}

	// eslint-disable-next-line @typescript-eslint/ban-types
	downloadFile(url: string): Observable<any> {
		return this._http
			.get(url, { responseType: 'blob' });
	}

	downloadAll(files: { soporte: string; tipo: string }[]): void {
		forkJoin(
			files.map(r =>
				this._http.get(r.soporte, { responseType: 'blob' })
			)
		).subscribe((response: any[]) => {
			if (response.some(r => !r)) {
				this._alert.error({
					title: 'Error',
					text: 'Error al procesar el contenido.',
				});
				return;
			}

			const zip = new jszip();

			response.forEach((r, i) => {
				if (r) {
					zip.file(new Date().getTime().toString() + '.' + files[i].tipo, r);
				}
			});

			zip.generateAsync({ type: 'blob' }).then((content) => {
				File.saveAs(content, 'documentos.zip');
			});
		}, ({ message }) => {
			this._alert.error({
				title: 'Error',
				text: message || 'Error al procesar el contenido.',
			});
		});
	}
}
