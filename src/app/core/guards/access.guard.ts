import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	RouterStateSnapshot,
	UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../helpers/storage.service';
import { MenuService } from '../services/menu.service';

@Injectable({
	providedIn: 'root',
})
export class AccessGuard implements CanActivate {
	constructor(private _storage: StorageService, private _menu: MenuService) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	):
		| Observable<boolean | UrlTree>
		| Promise<boolean | UrlTree>
		| boolean
		| UrlTree {
		const menu = this._menu.getMenuByRole(this._storage.getRolID());
		const menuChildren = menu.filter(
			r => r.children.length > 0 || r.type === 'collapsable'
		);
		return true;
	}
}
