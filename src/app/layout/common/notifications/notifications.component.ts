import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	OnDestroy,
	OnInit,
	TemplateRef,
	ViewChild,
	ViewContainerRef,
	ViewEncapsulation,
} from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { MatButton } from '@angular/material/button';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
	selector: 'notifications',
	templateUrl: './notifications.component.html',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	exportAs: 'notifications',
})
export class NotificationsComponent implements OnInit, OnDestroy {
	@ViewChild('notificationsOrigin') private _notificationsOrigin: MatButton;
	@ViewChild('notificationsPanel')
	private _notificationsPanel: TemplateRef<any>;

	notifications = [
		// {
		// 	id: '30af917b-7a6a-45d1-822f-9e7ad7f8bf69',
		// 	icon: 'heroicons_solid:refresh',
		// 	title: 'Cron jobs',
		// 	description: 'Your Vagrant container is ready to download',
		// 	time: '2022-12-27T22:40:59.886Z',
		// 	read: true,
		// 	link: '/dashboards/project',
		// 	useRouter: true,
		// },
	];
	unreadCount: number = 0;
	private _overlayRef: OverlayRef;
	private _unsubscribeAll: Subject<any> = new Subject<any>();

	/**
	 * Constructor
	 */
	constructor(
		private _changeDetectorRef: ChangeDetectorRef,
		private _overlay: Overlay,
		private _viewContainerRef: ViewContainerRef
	) {}

	// -----------------------------------------------------------------------------------------------------
	// @ Lifecycle hooks
	// -----------------------------------------------------------------------------------------------------

	/**
	 * On init
	 */
	ngOnInit(): void {}

	/**
	 * On destroy
	 */
	ngOnDestroy(): void {
		// Unsubscribe from all subscriptions
		this._unsubscribeAll.next();
		this._unsubscribeAll.complete();

		// Dispose the overlay
		if (this._overlayRef) {
			this._overlayRef.dispose();
		}
	}

	// -----------------------------------------------------------------------------------------------------
	// @ Public methods
	// -----------------------------------------------------------------------------------------------------

	/**
	 * Open the notifications panel
	 */
	openPanel(): void {
		// Return if the notifications panel or its origin is not defined
		if (!this._notificationsPanel || !this._notificationsOrigin) {
			return;
		}

		// Create the overlay if it doesn't exist
		if (!this._overlayRef) {
			this._createOverlay();
		}

		// Attach the portal to the overlay
		this._overlayRef.attach(
			new TemplatePortal(this._notificationsPanel, this._viewContainerRef)
		);
	}

	/**
	 * Close the messages panel
	 */
	closePanel(): void {
		this._overlayRef.detach();
	}

	/**
	 * Mark all notifications as read
	 */
	markAllAsRead(): void {
		// Mark all as read
	}

	/**
	 * Toggle read status of the given notification
	 */
	toggleRead(notification: Notification): void {
		// Toggle the read status
	}

	/**
	 * Delete the given notification
	 */
	delete(notification: Notification): void {
		// Delete the notification
	}

	/**
	 * Track by function for ngFor loops
	 *
	 * @param index
	 * @param item
	 */
	trackByFn(index: number, item: any): any {
		return item.id || index;
	}

	// -----------------------------------------------------------------------------------------------------
	// @ Private methods
	// -----------------------------------------------------------------------------------------------------

	/**
	 * Create the overlay
	 */
	private _createOverlay(): void {
		// Create the overlay
		this._overlayRef = this._overlay.create({
			hasBackdrop: true,
			backdropClass: 'fuse-backdrop-on-mobile',
			scrollStrategy: this._overlay.scrollStrategies.block(),
			positionStrategy: this._overlay
				.position()
				.flexibleConnectedTo(
					this._notificationsOrigin._elementRef.nativeElement
				)
				.withLockedPosition(true)
				.withPush(true)
				.withPositions([
					{
						originX: 'start',
						originY: 'bottom',
						overlayX: 'start',
						overlayY: 'top',
					},
					{
						originX: 'start',
						originY: 'top',
						overlayX: 'start',
						overlayY: 'bottom',
					},
					{
						originX: 'end',
						originY: 'bottom',
						overlayX: 'end',
						overlayY: 'top',
					},
					{
						originX: 'end',
						originY: 'top',
						overlayX: 'end',
						overlayY: 'bottom',
					},
				]),
		});

		// Detach the overlay from the portal on backdrop click
		this._overlayRef.backdropClick().subscribe(() => {
			this._overlayRef.detach();
		});
	}

	/**
	 * Calculate the unread count
	 *
	 * @private
	 */
	private _calculateUnreadCount(): void {
		let count = 0;

		if (this.notifications && this.notifications.length) {
			count = this.notifications.filter(
				(notification: any) => !notification.read
			).length;
		}

		this.unreadCount = count;
	}
}
