/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Pokedex {
	score_resumen: ScoreResumen;
	resumen_mes: ResumenMes[];
	progreso_servicio: ProgresoServicio[];
}

export interface ProgresoServicio {
	condicion: string;
	generadas: number;
	resumen: ProgresoServicioResuman[];
}

export interface ProgresoServicioResuman {
	Refrigeracion?: number;
	Suministro?: number;
	'Adecuaciones Locativas'?: number;
	Alquiler?: number;
	General?: number;
	Mantenimiento?: number;
}

export interface ResumenMes {
	periodo: string;
	generadas: number;
	resumen: ProgresoServicioResuman[];
}

export interface ScoreResumen {
	resumen: ScoreResumenResuman[];
}

export interface ScoreResumenResuman {
	generadas: number;
	pendiente: number;
	completadas: number;
}

@Injectable({
	providedIn: 'root',
})
export class ScoreService {
	constructor(private _api: ApiService) {}

	get(
		{
			idcliente,
			idclientesede,
			idtercero,
		}: { idcliente: string; idclientesede: string; idtercero: string } = {
			idcliente: '0',
			idclientesede: '0',
			idtercero: '0',
		}
	): Observable<{
		progreso_servicio: ProgresoServicio[];
		resumen_mes: ResumenMes[];
		score_resumen: ScoreResumen;
	}> {
		return this._api
			.get(
				`option/list-score?idcliente=${idcliente}&idclientesede=${idclientesede}&idtercero=${idtercero}`
			)
			.pipe(
				map((response: any[]) => ({
					score_resumen: JSON.parse(response[0].score_resumen),
					resumen_mes: JSON.parse(response[0].resumen_mes),
					progreso_servicio: JSON.parse(
						response[0].progreso_servicio
					),
				}))
			);
	}
}
