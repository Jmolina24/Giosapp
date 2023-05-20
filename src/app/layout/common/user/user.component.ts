import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	Input,
	OnDestroy,
	OnInit,
	ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BooleanInput } from '@angular/cdk/coercion';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StorageService } from 'app/core/helpers/storage.service';

@Component({
	selector: 'user',
	templateUrl: './user.component.html',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	exportAs: 'user',
})
export class UserComponent implements OnInit, OnDestroy {
	/* eslint-disable @typescript-eslint/naming-convention */
	static ngAcceptInputType_showAvatar: BooleanInput;
	/* eslint-enable @typescript-eslint/naming-convention */

	@Input() showAvatar: boolean = true;
	user: any = {};

	private _unsubscribeAll: Subject<any> = new Subject<any>();

	/**
	 * Constructor
	 */
	constructor(
		private _router: Router,
		private _activatedRoute: ActivatedRoute,
		private _storage: StorageService
	) {}

	// -----------------------------------------------------------------------------------------------------
	// @ Lifecycle hooks
	// -----------------------------------------------------------------------------------------------------

	/**
	 * On init
	 */
	ngOnInit(): void {
		this.user = this._storage.getUser();

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
	 * Update the user status
	 *
	 * @param status
	 */
	updateUserStatus(status: string): void {
		// Return if user is not available
		if (!this.user) {
			return;
		}

		// Update the user
	}

	/**
	 * Sign out
	 */
	signOut(): void {
		this._storage.signOut();
		this._router.navigate(['/sign-out']);
	}

	goToProfile(): void {
		this._router.navigate(['/dashboard/user/profile']);
	}
}
