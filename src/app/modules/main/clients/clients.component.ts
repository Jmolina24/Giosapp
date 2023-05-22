import { Component, OnInit } from '@angular/core';
import { ClientsService } from 'app/core/services/clients.service';
import { GeneralService } from 'app/core/services/general.service';

@Component({
	selector: 'app-clients',
	templateUrl: './clients.component.html',
	styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

	list: any[] = [];

	constructor(private _service: ClientsService) { }

	ngOnInit(): void {
		this.get();
	}

	get(): void {
		this._service.get().subscribe((response) => {
			// if (!response) {
			// 	return;
			// }

			// this.list = response;
		})
	}
}
