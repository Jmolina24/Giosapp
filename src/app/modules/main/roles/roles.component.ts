import { Component, OnInit } from '@angular/core';
import { RolesService } from 'app/core/services/roles.service';

@Component({
	selector: 'app-roles',
	templateUrl: './roles.component.html',
	styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit {
	list: any[] = [];

	constructor(private _service: RolesService) {}

	ngOnInit(): void {
		this.get();
	}

	get(): void {
		this._service.get().subscribe((response) => {
			if (!response) {
				return;
			}

			this.list = response;
		});
	}
}
