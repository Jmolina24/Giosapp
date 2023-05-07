import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from 'environments/environment';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	/**
	 * Constructor
	 */
	constructor(private title: Title) {
		this.title.setTitle(environment.name);
	}
}
