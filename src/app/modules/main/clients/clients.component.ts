import { Component, OnInit } from '@angular/core';
import { ClientsService } from 'app/core/services/clients.service';

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
		this._service.get().then((response) => {
			if (!response) {
				return;
			}

			this.list = response;

			console.log(response);
		})
	}
}
