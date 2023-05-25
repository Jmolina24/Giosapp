import { Component, OnInit } from '@angular/core';
import { ThirdPartiesService } from 'app/core/services/third-parties.service';

@Component({
	selector: 'app-third-parties',
	templateUrl: './third-parties.component.html',
	styleUrls: ['./third-parties.component.scss']
})
export class ThirdPartiesComponent implements OnInit {

	list: any[] = [];

	constructor(private _service: ThirdPartiesService) { }

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
