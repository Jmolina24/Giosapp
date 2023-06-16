import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivateChild,
	Router,
	RouterStateSnapshot,
	UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { MenuService } from '../services/menu.service';
import { StorageService } from '../helpers/storage.service';

@Injectable({
	providedIn: 'root',
})
export class AccessGuard implements CanActivateChild {
	constructor(
		private _storage: StorageService,
		private _menu: MenuService,
		private _router: Router
	) {}

	canActivateChild(
		childRoute: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	):
		| Observable<boolean | UrlTree>
		| Promise<boolean | UrlTree>
		| boolean
		| UrlTree {
		if (state.url.includes('/panel/archivo-detalle') && (this._menu.getAction('process.orders', 'view_support') || this._menu.getAction('process.assigned', 'view_support'))) {
			return true;
		}
		if (
			!this._menu
				.getMenuOneLevel(this._storage.getRolID())
				.find(r => r.link.includes(state.url))
		) {
			this._router.navigate(['/']);
			return false;
		}
		return true;
	}
}
