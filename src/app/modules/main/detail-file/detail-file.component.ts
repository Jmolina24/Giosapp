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

	listSupport: any[] = [];

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
					text: 'Ingrese datos validos',
				});
				return;
			}

			if (!isNaN(iddetalleorden) && !isNaN(iddetalleordensoporte)) {
				this._alert.error({
					title: 'Error',
					text: 'Ingrese datos validos',
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
				(response: any) => {
					this._alert.closeAlert();
					if (response.codigo !== 0) {
						this._alert.error({
							title: response.titulo,
							text: response.mensaje,
						});
						return;
					}

					this.listSupport = response.map((r) => {
						if (r.estado === 'CARGADO' && r.soporte) {
							const soporte = r.soporte.split('.');
							r.tipo = soporte[soporte.length - 1].toUpperCase();
						}
						return r;
					});
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
}
