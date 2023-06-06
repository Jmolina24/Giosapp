import { Component, OnInit } from '@angular/core';
import { StorageService } from 'app/core/helpers/storage.service';

@Component({
	selector: 'app-assigned-services',
	templateUrl: './assigned-services.component.html',
	styleUrls: ['./assigned-services.component.scss'],
})
export class AssignedServicesComponent implements OnInit {

	idtercero: string = String(0);
	// idtercero: string = String(this._storage.getUser().idtercero);

	constructor(private _storage: StorageService) {}

	ngOnInit(): void {}
}
