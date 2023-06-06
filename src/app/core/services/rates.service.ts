/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class RatesService {
	list: any[] = [
		{
			idterceroservicio: 12,
			idservicio: 10,
			servicio: 'MANTENIMIENTO DE AIRE ACONDICIONADO',
			tiposervicio: 'Refrigeración',
			unidad_medida: 'Unidad',
			idciudadcobertura: 405,
			ciudadcobertura: 'AGUACHICA',
			departamentocobertura: 'CESAR',
			iddepartamentocobertura: 2,
			idtercero: 14,
			tercero: 'CAIMANES SAS',
			valor: 135000,
			porcentaje: 47,
			estado: 'ACTIVO',
			codigoestado: 'A',
		},
		{
			idterceroservicio: 11,
			idservicio: 9,
			servicio: 'SERVICIO CONSERJERÍA',
			tiposervicio: 'Provision Recurso Humano',
			unidad_medida: 'Unidad',
			idciudadcobertura: 405,
			ciudadcobertura: 'AGUACHICA',
			departamentocobertura: 'CESAR',
			iddepartamentocobertura: 2,
			idtercero: 14,
			tercero: 'CAIMANES SAS',
			valor: 123000,
			porcentaje: 64,
			estado: 'ACTIVO',
			codigoestado: 'A',
		},
		{
			idterceroservicio: 10,
			idservicio: 4,
			servicio: 'SERVICIO DE VIGILANCIA 24/7',
			tiposervicio: 'Provision Recurso Humano',
			unidad_medida: 'Unidad',
			idciudadcobertura: 405,
			ciudadcobertura: 'AGUACHICA',
			departamentocobertura: 'CESAR',
			iddepartamentocobertura: 2,
			idtercero: 14,
			tercero: 'CAIMANES SAS',
			valor: 250000,
			porcentaje: 20,
			estado: 'ACTIVO',
			codigoestado: 'A',
		},
		{
			idterceroservicio: 9,
			idservicio: 3,
			servicio: 'MANTENIMIENTO DE PLANTA ELÉCTRICA',
			tiposervicio: 'Mantenimiento',
			unidad_medida: 'Unidad',
			idciudadcobertura: 404,
			ciudadcobertura: 'VALLEDUPAR',
			departamentocobertura: 'CESAR',
			iddepartamentocobertura: 2,
			idtercero: 13,
			tercero: 'JAIR MOLINA',
			valor: 340000,
			porcentaje: 33,
			estado: 'ACTIVO',
			codigoestado: 'A',
		},
		{
			idterceroservicio: 8,
			idservicio: 2,
			servicio: 'SERVICIO TANQUEO COMBUSTIBLE',
			tiposervicio: 'Servicios Relacionados',
			unidad_medida: 'Unidad',
			idciudadcobertura: 404,
			ciudadcobertura: 'VALLEDUPAR',
			departamentocobertura: 'CESAR',
			iddepartamentocobertura: 2,
			idtercero: 13,
			tercero: 'JAIR MOLINA',
			valor: 125000,
			porcentaje: 55,
			estado: 'ACTIVO',
			codigoestado: 'A',
		},
		{
			idterceroservicio: 7,
			idservicio: 1,
			servicio: 'COMBUSTIBLE ACPM PREMIUM',
			tiposervicio: 'Consultoria',
			unidad_medida: 'Galon',
			idciudadcobertura: 404,
			ciudadcobertura: 'VALLEDUPAR',
			departamentocobertura: 'CESAR',
			iddepartamentocobertura: 2,
			idtercero: 13,
			tercero: 'JAIR MOLINA',
			valor: 230000,
			porcentaje: 35,
			estado: 'ACTIVO',
			codigoestado: 'A',
		},
		{
			idterceroservicio: 6,
			idservicio: 10,
			servicio: 'MANTENIMIENTO DE AIRE ACONDICIONADO',
			tiposervicio: 'Refrigeración',
			unidad_medida: 'Unidad',
			idciudadcobertura: 1,
			ciudadcobertura: 'BARRANQUILLA',
			departamentocobertura: 'ATLANTICO',
			iddepartamentocobertura: 1,
			idtercero: 12,
			tercero: 'OSMAN GONZALEZ',
			valor: 325000,
			porcentaje: 52,
			estado: 'ACTIVO',
			codigoestado: 'A',
		},
		{
			idterceroservicio: 5,
			idservicio: 9,
			servicio: 'SERVICIO CONSERJERÍA',
			tiposervicio: 'Provision Recurso Humano',
			unidad_medida: 'Unidad',
			idciudadcobertura: 1,
			ciudadcobertura: 'BARRANQUILLA',
			departamentocobertura: 'ATLANTICO',
			iddepartamentocobertura: 1,
			idtercero: 12,
			tercero: 'OSMAN GONZALEZ',
			valor: 23000,
			porcentaje: 45,
			estado: 'ACTIVO',
			codigoestado: 'A',
		},
		{
			idterceroservicio: 4,
			idservicio: 4,
			servicio: 'SERVICIO DE VIGILANCIA 24/7',
			tiposervicio: 'Provision Recurso Humano',
			unidad_medida: 'Unidad',
			idciudadcobertura: 1,
			ciudadcobertura: 'BARRANQUILLA',
			departamentocobertura: 'ATLANTICO',
			iddepartamentocobertura: 1,
			idtercero: 12,
			tercero: 'OSMAN GONZALEZ',
			valor: 250000,
			porcentaje: 35,
			estado: 'ACTIVO',
			codigoestado: 'A',
		},
		{
			idterceroservicio: 3,
			idservicio: 3,
			servicio: 'MANTENIMIENTO DE PLANTA ELÉCTRICA',
			tiposervicio: 'Mantenimiento',
			unidad_medida: 'Unidad',
			idciudadcobertura: 1,
			ciudadcobertura: 'BARRANQUILLA',
			departamentocobertura: 'ATLANTICO',
			iddepartamentocobertura: 1,
			idtercero: 12,
			tercero: 'OSMAN GONZALEZ',
			valor: 125000,
			porcentaje: 60,
			estado: 'ACTIVO',
			codigoestado: 'A',
		},
		{
			idterceroservicio: 2,
			idservicio: 2,
			servicio: 'SERVICIO TANQUEO COMBUSTIBLE',
			tiposervicio: 'Servicios Relacionados',
			unidad_medida: 'Unidad',
			idciudadcobertura: 1,
			ciudadcobertura: 'BARRANQUILLA',
			departamentocobertura: 'ATLANTICO',
			iddepartamentocobertura: 1,
			idtercero: 12,
			tercero: 'OSMAN GONZALEZ',
			valor: 400000,
			porcentaje: 30,
			estado: 'ACTIVO',
			codigoestado: 'A',
		},
		{
			idterceroservicio: 1,
			idservicio: 1,
			servicio: 'COMBUSTIBLE ACPM PREMIUM',
			tiposervicio: 'Consultoria',
			unidad_medida: 'Galon',
			idciudadcobertura: 1,
			ciudadcobertura: 'BARRANQUILLA',
			departamentocobertura: 'ATLANTICO',
			iddepartamentocobertura: 1,
			idtercero: 12,
			tercero: 'OSMAN GONZALEZ',
			valor: 350000,
			porcentaje: 50,
			estado: 'ACTIVO',
			codigoestado: 'A',
		},
	];

	constructor() {}

	public get({
		id = 0,
		estado = 'T',
	}: { id?: number; estado?: string } = {}): Observable<any> {
		return of(this.list);
	}

	public changeStatus(idrol = '0', status: string = 'A'): Observable<any> {
		if (!idrol) {
			return;
		}

		return;
	}

	public create(content: {
		idterceroservicio: string;
		idtercero: string;
		idservicio: string;
		idciudad: string;
		valor: string;
	}): Observable<any> {
		if (Object.keys(content).some(element => !element)) {
			return;
		}

		// if (content.idterceroservicio){
		// 	const x = this.list.find(r => r.idterceroservicio === content.idterceroservicio);
		// }

		this.list.push(content);

		return new Observable((observer) => {
			// Emitir el objeto al observador
			observer.next({
				codigo: 1,
				mensaje: 'Datos guardados correctamente...',
			});
			observer.complete();
		});
	}
}
