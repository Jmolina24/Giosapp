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

const githubIssues = {
	overview: {
		'this-week': {
			'new-issues': 214,
			'closed-issues': 75,
			fixed: 3,
			'wont-fix': 4,
			're-opened': 8,
			'needs-triage': 6,
		},
		'last-week': {
			'new-issues': 197,
			'closed-issues': 72,
			fixed: 6,
			'wont-fix': 11,
			're-opened': 6,
			'needs-triage': 5,
		},
	},
	labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
	series: {
		'this-week': [
			{
				name: 'New issues',
				type: 'line',
				data: [42, 28],
			},
			{
				name: 'Closed issues',
				type: 'bar',
				data: [11, 10],
			},
		],
		'last-week': [
			{
				name: 'New issues',
				type: 'line',
				data: [37, 32, 39, 27, 18, 24, 20],
			},
			{
				name: 'Closed issues',
				type: 'column',
				data: [9, 8, 10, 12, 7, 11, 15],
			},
			{
				name: 'Closed issues',
				type: 'column',
				data: [9, 8, 10, 12, 7, 11, 15],
			},
		],
	},
};

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
	// @ViewChild('chart') chart: ChartComponent;

	chartsResumenMes: ApexOptions;
	chartsProgressServices: Partial<ChartOptions>;

	user: any = {};

	score!: {
		progreso_servicio?: ProgresoServicio[];
		resumen_mes?: ResumenMes[];
		score_resumen?: ScoreResumen;
	};

	constructor(
		private _orders: OrdersService,
		private _storage: StorageService,
		private _score: ScoreService
	) {
		this.user = _storage.getUser();
	}
	ngAfterViewInit(): void {
		this._score.get().subscribe((r) => {
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
		console.log(data);
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
