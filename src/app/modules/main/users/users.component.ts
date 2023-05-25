import { Component, OnInit } from '@angular/core';
import { SweetAlertService } from 'app/core/helpers/sweet-alert.service';
import { UsersService } from 'app/core/services/users.service';

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
	list: any[] = [];

	data: any = null;

	section: 'add' | 'edit' | null;

	constructor(
		private _service: UsersService,
		private _alert: SweetAlertService
	) {}

	ngOnInit(): void {
		this.get();
	}

	get(): void {
		this._service.get().subscribe((response: any) => {
			if (!response) {
				return;
			}

			this.list = response;
		});
	}

	changeStatus({ idusuario }, status: 'A' | 'I'): void {
		this._alert.loading();

		this._service.changeStatus(idusuario, status).subscribe(
			(response) => {
				this._alert.closeAlert();
				if (response.codigo !== 0) {
					this._alert.error({
						title: response.titulo,
						text: response.mensaje,
					});
					return;
				}

				this._alert.success({
					title: response.titulo,
					text: response.mensaje,
				});

				this.get();
			},
			(error) => {
				this._alert.error({
					title: error.titulo || 'Error',
					text: error.mensaje || 'Error al procesar la solicitud.',
				});
			}
		);
	}

	// showSection(section: 'add' | 'edit', data = null): void {
	// 	this.section = section;

	// 	if (!data) {
	// 		this.data = {
	// 			idservicio: '',
	// 			idtiposervicio: '',
	// 			idunidad_medida: '',
	// 			codigo: '',
	// 			nombre: '',
	// 			descripcion: '',
	// 		};
	// 		return;
	// 	}

	// 	this.data = data;
	// }
}
