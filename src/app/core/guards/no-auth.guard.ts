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
	/**
	 * Verifica si el usuario no está autenticado antes de activar una ruta.
	 *
	 * @param route El snapshot de la ruta actual.
	 * @param state El snapshot del estado actual del enrutador.
	 * @returns Un observable que emite un booleano o un UrlTree, o una promesa de un booleano o un UrlTree, o un booleano o un UrlTree.
	 */
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
