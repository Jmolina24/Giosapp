/* eslint-disable @typescript-eslint/no-shadow */
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import {
	FuseNavigationService,
	FuseVerticalNavigationComponent,
} from '@fuse/components/navigation';
import { StorageService } from 'app/core/helpers/storage.service';
import { MenuService } from 'app/core/services/menu.service';

@Component({
	selector: 'classy-layout',
	templateUrl: './classy.component.html',
	encapsulation: ViewEncapsulation.None,
})
export class ClassyLayoutComponent implements OnInit, OnDestroy {
	isScreenSmall: boolean;
	navigation = [];
	user: any = {};
	private _unsubscribeAll: Subject<any> = new Subject<any>();

	/**
	 * Constructor
	 */
	constructor(
		private _activatedRoute: ActivatedRoute,
		private _fuseMediaWatcherService: FuseMediaWatcherService,
		private _fuseNavigationService: FuseNavigationService,
		private _storage: StorageService,
		private _menu: MenuService
	) {}

	// -----------------------------------------------------------------------------------------------------
	// @ Accessors
	// -----------------------------------------------------------------------------------------------------

	/**
	 * Getter for current year
	 */
	get currentYear(): number {
		return new Date().getFullYear();
	}

	// -----------------------------------------------------------------------------------------------------
	// @ Lifecycle hooks
	// -----------------------------------------------------------------------------------------------------

	/**
	 * On init
	 */
	ngOnInit(): void {
		this.user = this._storage.getUser();
		this.navigation = this._menu.getMenuByRole(this._storage.getRolID());
		console.log(this._menu.getAccessByRole(this._storage.getRolID()));
	}

	/**
	 * On destroy
	 */
	ngOnDestroy(): void {
		// Unsubscribe from all subscriptions
		this._unsubscribeAll.next();
		this._unsubscribeAll.complete();
	}

	// -----------------------------------------------------------------------------------------------------
	// @ Public methods
	// -----------------------------------------------------------------------------------------------------

	/**
	 * Toggle navigation
	 *
	 * @param name
	 */
	toggleNavigation(name: string): void {
		// Get the navigation
		const navigation = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(
				name
			);

		if (navigation) {
			// Toggle the opened status
			navigation.toggle();
		}
	}
}
