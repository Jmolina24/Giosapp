import { Injectable } from '@angular/core';
import {
	ApexAxisChartSeries,
	ApexChart,
	ApexDataLabels,
	ApexFill,
	ApexGrid,
	ApexPlotOptions,
	ApexStroke,
	ApexTitleSubtitle,
	ApexTooltip,
	ApexXAxis,
	ApexYAxis,
} from 'ng-apexcharts';

export type ChartOptions = {
	series: ApexAxisChartSeries;
	chart: ApexChart;
	xaxis: ApexXAxis;
	dataLabels: ApexDataLabels;
	grid: ApexGrid;
	stroke: ApexStroke;
	title: ApexTitleSubtitle;
	plotOptions?: ApexPlotOptions;
	yaxis?: ApexYAxis;
	fill?: ApexFill;
	tooltip?: ApexTooltip;
};
@Injectable({
	providedIn: 'root',
})
export class ChartsService {
	constructor() {}

	static line(
		data: any[],
		categories: any[],
		name: string,
		text?: string
	): Partial<ChartOptions> {
		return {
			series: [
				{
					name,
					data,
				},
			],
			chart: {
				height: 350,
				type: 'line',
				zoom: {
					enabled: false,
				},
			},
			dataLabels: {
				enabled: false,
			},
			stroke: {
				curve: 'straight',
			},
			title: {
				text,
				align: 'center',
			},
			grid: {
				row: {
					colors: ['#f3f3f3', 'transparent'],
					opacity: 0.5,
				},
			},
			xaxis: {
				categories,
			},
		};
	}

	static bar(
		data: any[],
		categories: any[],
		name: string,
		text?: string
	): Partial<ChartOptions> {
		return {
			series: [
				{
					name,
					data,
				},
			],
			chart: {
				height: 350,
				type: 'bar',
			},
			plotOptions: {
				bar: {
					dataLabels: {
						position: 'top', // top, center, bottom
					},
				},
			},
			dataLabels: {
				enabled: true,
				formatter: (val): string => val + '%',
				offsetY: -20,
				style: {
					fontSize: '12px',
					colors: ['#304758'],
				},
			},

			xaxis: {
				categories,
				position: 'top',
				labels: {
					offsetY: -18,
				},
				axisBorder: {
					show: false,
				},
				axisTicks: {
					show: false,
				},
				crosshairs: {
					fill: {
						type: 'gradient',
						gradient: {
							colorFrom: '#D8E3F0',
							colorTo: '#BED1E6',
							stops: [0, 100],
							opacityFrom: 0.4,
							opacityTo: 0.5,
						},
					},
				},
				tooltip: {
					enabled: true,
					offsetY: -35,
				},
			},
			fill: {
				type: 'gradient',
				gradient: {
					shade: 'light',
					type: 'horizontal',
					shadeIntensity: 0.25,
					gradientToColors: undefined,
					inverseColors: true,
					opacityFrom: 1,
					opacityTo: 1,
					stops: [50, 0, 100, 100],
				},
			},
			yaxis: {
				axisBorder: {
					show: false,
				},
				axisTicks: {
					show: false,
				},
				labels: {
					show: false,
					formatter: (val): string => val + '%',
				},
			},
			title: {
				text,
				floating: true,
				offsetY: 320,
				align: 'center',
				style: {
					color: '#444',
				},
			},
		};
	}

	static basicBar(
		categories: any[],
		series: { name: string; data: any[] }[],
		text?: string
	): Partial<ChartOptions> {
		return {
			series,
			chart: {
				type: 'bar',
				height: 350,
			},
			plotOptions: {
				bar: {
					horizontal: false,
					columnWidth: '55%',
				},
			},
			dataLabels: {
				enabled: false,
			},
			stroke: {
				show: true,
				width: 2,
				colors: ['transparent'],
			},
			xaxis: {
				categories,
			},
			yaxis: {
				title: {
					text,
				},
			},
			fill: {
				opacity: 1,
			},
			tooltip: {
				y: {
					formatter: (val): string => val + '%',
				},
			},
		};
	}
}
