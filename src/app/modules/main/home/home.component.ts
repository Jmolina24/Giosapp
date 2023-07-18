/* eslint-disable quote-props */
import { Component, OnInit } from '@angular/core';
import { ApexOptions, ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexPlotOptions, ApexXAxis } from 'ng-apexcharts';

import * as _ from 'lodash';
import { OrdersService } from 'app/core/services/orders.service';
import { StorageService } from 'app/core/helpers/storage.service';

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
				data: [42, 28, 43, 34, 20, 25, 22],
			},
			{
				name: 'Closed issues',
				type: 'column',
				data: [11, 10, 8, 11, 8, 10, 17],
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
export class HomeComponent implements OnInit {
	// @ViewChild('chart') chart: ChartComponent;

	chartGithubIssues: ApexOptions = {};
	chartOptions: Partial<ChartOptions>;

	user: any = {};

	constructor(private _orders: OrdersService, private _storage: StorageService) {
		this.user = _storage.getUser();
	}

	ngOnInit(): void {
		this._prepareChartData();
		this._test();
	}

	private _prepareChartData(): void {
		this.chartGithubIssues = {
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
			labels: githubIssues.labels,
			legend: {
				show: false,
			},
			plotOptions: {
				bar: {
					columnWidth: '50%',
				},
			},
			series: githubIssues.series['last-week'],
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

		this.chartOptions = {
			series: [
			  {
				name: 'basic',
				data: [20, 40],
				color: '#F44336'
			  },
			  {
				name: 'basic',
				data: [20, 40],
				color: '#F44336'
			  },
			],
			chart: {
			  type: 'bar',
			  height: 350
			},
			plotOptions: {
			  bar: {
				horizontal: true
			  }
			},
			dataLabels: {
			  enabled: false
			},
			xaxis: {
			  categories: [
				'Extemporáneos',
				'En Tiempos'
			  ]
			}
		  };
	}

	private _test(): void {
		this._orders.getDetails().subscribe((response) => {
			// console.log(_.chain(response).groupBy('estado').value());
		});
	}
}
