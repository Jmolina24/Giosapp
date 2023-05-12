import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
	UrlTree,
} from '@angular/router';
import { StorageService } from 'app/core/helpers/storage.service';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
	constructor(private _router: Router, private _storage: StorageService) {}
	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	):
		| Observable<boolean | UrlTree>
		| Promise<boolean | UrlTree>
		| boolean
		| UrlTree {
		if (!this._storage.getToken()) {
			return true;
		}
		this._router.navigate(['/dashboard']);
		return false;
	}
}
