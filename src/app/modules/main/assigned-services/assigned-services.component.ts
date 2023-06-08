import { Component, OnInit } from '@angular/core';
import { StorageService } from 'app/core/helpers/storage.service';

@Component({
	selector: 'app-assigned-services',
	templateUrl: './assigned-services.component.html',
	styleUrls: ['./assigned-services.component.scss'],
})
export class AssignedServicesComponent implements OnInit {

	list: any[] = [];

	idtercero: string = String(this._storage.getUser().idtercero);
	// idtercero: string = String('0');

	options: 'REALIZADA' | 'ASIGNADA' | 'POR ASIGNAR' | 'ANULADA' | 'TOTAL' = 'ASIGNADA';

	constructor(private _storage: StorageService) {}

	ngOnInit(): void {}

	loadContent(data): void {
		this.list = data;
	}

	getLengthStatus(key: string): number {
		return this.list.filter(element => element.estado === key).length;
	}


}
