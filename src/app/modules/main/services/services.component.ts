import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'app/core/services/services.service';

@Component({
	selector: 'app-services',
	templateUrl: './services.component.html',
	styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

	list: any[] = [];

	constructor(private _service: ServicesService) { }

	ngOnInit(): void {
		this.get();
	}

	get(): void {
		this._service.get().subscribe((response) => {
			if (!response) {
				return;
			}

			this.list = response;
		})
	}
}
