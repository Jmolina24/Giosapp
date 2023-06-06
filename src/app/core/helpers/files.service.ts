import { Injectable } from '@angular/core';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs';

const EXCEL_TYPE =
	'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
	providedIn: 'root',
})
export class FilesService {

	constructor(private _api: ApiService) {}

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
}
