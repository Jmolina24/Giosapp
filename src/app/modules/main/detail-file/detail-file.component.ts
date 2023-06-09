import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SweetAlertService } from 'app/core/helpers/sweet-alert.service';
import { OrdersService } from 'app/core/services/orders.service';

@Component({
	selector: 'app-detail-file',
	templateUrl: './detail-file.component.html',
	styleUrls: ['./detail-file.component.scss'],
})
export class DetailFileComponent implements OnInit {
	iddetalleorden: string = '0';
	iddetalleordensoporte: string = '0';

	support: any = null;

	constructor(
		private route: ActivatedRoute,
		private _service: OrdersService,
		private _alert: SweetAlertService
	) {}

	ngOnInit(): void {
		this.route.params.subscribe((params) => {
			const { iddetalleorden, iddetalleordensoporte } = params;

			if (!iddetalleorden && !iddetalleordensoporte) {
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

			this.iddetalleorden = iddetalleorden;
			this.iddetalleordensoporte = iddetalleordensoporte;

			this.getDetailSupportSelect(iddetalleorden, iddetalleordensoporte);
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

					this.support = response.map((r) => {
						if (r.estado === 'CARGADO' && r.soporte) {
							r.soporte = r.soporte.split('/web')[1];
							const soporte = r.soporte.split('.');
							r.tipo = soporte[soporte.length - 1].toUpperCase();
						}
						return r;
					})[0];
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

	back(): void {
		window.history.back();
	}
}
