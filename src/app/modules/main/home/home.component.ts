/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartComponent, ApexOptions } from 'ng-apexcharts';

import * as _ from 'lodash';
import { OrdersService } from 'app/core/services/orders.service';

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

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
	@ViewChild('chart') chart: ChartComponent;

	chartGithubIssues: ApexOptions = {};

	constructor(private _orders: OrdersService) {}

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
	}

	private _test(): void {
		this._orders.getDetails().subscribe((response) => {
			console.log(_.chain(response).groupBy('estado').value());
		});
	}
}
