import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { navigationAdmin, navigationClient } from './navigation';
import {
	FuseNavigationService,
	FuseVerticalNavigationComponent,
} from '@fuse/components/navigation';
import { StorageService } from 'app/core/helpers/storage.service';

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
		private _storage: StorageService
	) {
		const rolId = this._storage.getRolID();

		switch (Number(rolId)) {
			case 1:
				this.navigation = navigationAdmin;
				break;
			case 2:
				this.navigation = navigationClient;
				break;
			default:
				this.navigation = navigationClient;
				break;
		}
	}

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
		// Subscribe to navigation data

		// Subscribe to media changes
		this._fuseMediaWatcherService.onMediaChange$
			.pipe(takeUntil(this._unsubscribeAll))
			.subscribe(({ matchingAliases }) => {
				// Check if the screen is small
				this.isScreenSmall = !matchingAliases.includes('md');
			});

		this._activatedRoute.data.subscribe(
			({ initial }) => (this.user = initial[0])
		);
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
		const navigation =
			this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(
				name
			);

		if (navigation) {
			// Toggle the opened status
			navigation.toggle();
		}
	}
}
