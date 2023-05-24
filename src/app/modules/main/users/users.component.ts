import { Component, OnInit } from '@angular/core';
import { UsersService } from 'app/core/services/users.service';

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
	list: any[] = [];

	constructor(private _service: UsersService) {}

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
}
