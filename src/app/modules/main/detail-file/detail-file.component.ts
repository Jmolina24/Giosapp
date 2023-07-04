/* eslint-disable eqeqeq */
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilesService } from 'app/core/helpers/files.service';
import { SweetAlertService } from 'app/core/helpers/sweet-alert.service';
import { OrdersService } from 'app/core/services/orders.service';

@Component({
	selector: 'app-detail-file',
	templateUrl: './detail-file.component.html',
	styleUrls: ['./detail-file.component.scss'],
})
export class DetailFileComponent implements OnInit {
	@Input() iddetalleorden: string = '0';
	@Input() iddetalleordensoporte: string = '0';
	@Input() index: string = '0';

	support: any = null;

	listSupport: any[] = [];

	constructor(
		private route: ActivatedRoute,
		private _service: OrdersService,
		private _alert: SweetAlertService,
		private _file: FilesService
	) {}

	ngOnInit(): void {
		this.route.params.subscribe((params) => {
			const { iddetalleorden, iddetalleordensoporte } = params;

			this.route.queryParams.subscribe(({ file }: any) => {
				if (!iddetalleorden && !iddetalleordensoporte && !file) {
					this._alert.error({
						title: 'Error',
						text: 'No son datos validos',
					});
					return;
				}

				if (isNaN(iddetalleorden) && isNaN(iddetalleordensoporte)) {
					this._alert.error({
						title: 'Error',
						text: 'No son datos validos',
					});
					return;
				}

				if (iddetalleorden != this.iddetalleorden || iddetalleordensoporte != this.iddetalleordensoporte) {
					this.getDetailSupportSelect(iddetalleorden, iddetalleordensoporte);
				}

				this.iddetalleorden = iddetalleorden;
				this.iddetalleordensoporte = iddetalleordensoporte;
				this.index = file;
			});
		});
	}

	getDetailSupportSelect(
		iddetalleorden: string,
		iddetalleordensoporte: string
	): void {
		this._alert.loading();
		this._service
			.getSupports({ iddetalleorden, iddetalleordensoporte })
			.subscribe(
				(response: any[]) => {
					this._alert.closeAlert();
					if (response.length === 0) {
						this._alert.error({
							title: 'Error',
							text: 'Error al obtener los datos',
						});
						return;
					}
					this.listSupport = response
						.filter(({ estado }) => estado === 'CARGADO')
						.map((r: any) => {
							r.soporte = JSON.parse(r.soporte || '[]');
							if (Array.isArray(r.soporte)) {
								r.soporte = r.soporte.map((t: string, index) => {
									const url =
										'https://demo.mainsoft.technology' +
										t.split('/web')[1];
									const y = url.split('.');
									const tipo = y[y.length - 1].toUpperCase();
									const supportObject = {
										tipo,
										soporte: url,
										index: r.iddetalleordensoporte + '-' + (index + 1),
									};
									return supportObject;
								});
							} else {
								r.soporte = [];
							}
							return r;
						})
						.reduce(
							(accumulator: any[], r: any) =>
								accumulator.concat(
									r.soporte.map(t => ({ ...r, ...t }))
								),
							[]
						);

					this.getSupport();
				},
				({ error }) => {
					this._alert.error({
						title: error.titulo || 'Error',
						text:
							error.mensaje || 'Error al procesar la solicitud.',
					});
				}
			);
	}

	getSupport(): void {
		this.support = this.listSupport.find(({ index }) => index === this.index);
	}

	back(): void {
		window.history.back();
	}

	changeFileNextOrPrevius(section: 'next' | 'previus', file: any): void {
		const data = this.listSupport;
		const d = data.findIndex(r => r.index === file.index);

		switch (section) {
			case 'next':
				this.support = data[d + 1 === data.length ? 0 : d + 1];
				break;
			case 'previus':
				this.support = data[d === 0 ? 0 : d - 1];
				break;
		}
	}

	download(url: string): void {
		this._file.download(url);
	}
}
