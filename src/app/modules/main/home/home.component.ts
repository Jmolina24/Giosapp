/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable quote-props */
import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
	ApexOptions,
	ApexAxisChartSeries,
	ApexChart,
	ApexDataLabels,
	ApexPlotOptions,
	ApexXAxis,
} from 'ng-apexcharts';

import * as _ from 'lodash';
import { OrdersService } from 'app/core/services/orders.service';
import { StorageService } from 'app/core/helpers/storage.service';
import {
	ProgresoServicio,
	ResumenMes,
	ScoreResumen,
	ScoreService,
} from 'app/core/services/score.service';

export type ChartOptions = {
	series: ApexAxisChartSeries;
	chart: ApexChart;
	dataLabels: ApexDataLabels;
	plotOptions: ApexPlotOptions;
	xaxis: ApexXAxis;
};

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
	chartsResumenMes: ApexOptions;
	chartsProgressServices: Partial<ChartOptions>;

	user: any = {};

	score!: {
		progreso_servicio?: ProgresoServicio[];
		resumen_mes?: ResumenMes[];
		score_resumen?: ScoreResumen;
	};

	constructor(
		private _storage: StorageService,
		private _score: ScoreService
	) {
		this.user = _storage.getUser();
	}
	ngAfterViewInit(): void {
		const { idcliente,  idclientesede, idtercero } = this.user;
		this._score.get({ idcliente,  idclientesede, idtercero }).subscribe((r) => {
			this.score = r;
			this._prepareChartData(r.resumen_mes);
			this._loadDataChart(r.progreso_servicio);
		});
	}

	ngOnInit(): void {}

	private _loadDataChart(data: any[]): void {
		this.chartsProgressServices = {
			series: data.map((item: any) => ({
				name: item.condicion,
				data: [item.generadas],
			})),
			chart: {
				type: 'bar',
				height: 350,
			},
			plotOptions: {
				bar: {
					horizontal: true,
				},
			},
			dataLabels: {
				enabled: false,
			},
			xaxis: {
				categories: data.map((item: any) => item.condicion),
			},
		};
	}

	private _prepareChartData(data: any[]): void {
		this.chartsResumenMes = {
			chart: {
				fontFamily: 'inherit',
				foreColor: 'inherit',
				height: '100%',
				type: 'line',
				toolbar: {
					show: false,
				},
				zoom: {
					enabled: false,
				},
			},
			colors: ['#64748B', '#94A3B8'],
			dataLabels: {
				enabled: true,
				enabledOnSeries: [0],
				background: {
					borderWidth: 0,
				},
			},
			grid: {
				borderColor: 'var(--fuse-border)',
			},
			labels: data.map((item: any) => item.periodo),
			legend: {
				show: false,
			},
			plotOptions: {
				bar: {
					columnWidth: '50%',
				},
			},
			series: [{
				name: 'Periodo',
				type: 'line',
				data: data.map(r => (r.generadas))}],
			states: {
				hover: {
					filter: {
						type: 'darken',
						value: 0.75,
					},
				},
			},
			stroke: {
				width: [3, 0],
			},
			tooltip: {
				followCursor: true,
				theme: 'dark',
			},
			xaxis: {
				axisBorder: {
					show: false,
				},
				axisTicks: {
					color: 'var(--fuse-border)',
				},
				labels: {
					style: {
						colors: 'var(--fuse-text-secondary)',
					},
				},
				tooltip: {
					enabled: false,
				},
			},
			yaxis: {
				labels: {
					offsetX: -16,
					style: {
						colors: 'var(--fuse-text-secondary)',
					},
				},
			},
		};
	}
}
