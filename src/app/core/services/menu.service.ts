/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { navigation } from 'app/layout/layouts/classy/navigation';
import { StorageService } from '../helpers/storage.service';

type Access =
	| 'menu'
	| 'menu.home'
	| 'menu.settings'
	| 'access'
	| 'access.roles'
	| 'access.users'
	| 'administration'
	| 'administration.clients'
	| 'administration.services'
	| 'administration.third-parties'
	| 'administration.rates'
	| 'process'
	| 'process.orders'
	| 'process.assigned-services'
	| '*';

type Name =
	| 'Administrador'
	| 'Cliente'
	| 'Proveedor'
	| 'Contratista'
	| 'Facilitador'
	| 'Facturacion'
	| 'Administrativo';

type Id = 1 | 2 | 3 | 4 | 5 | 6 | 7;

interface Menu {
	id: Id[];
	name: Name[];
	access: Access[];
	actions?: string[];
}

@Injectable({
	providedIn: 'root',
})
export class MenuService {
	menu: any[] = navigation;

	private roleAccesMenu: Menu[] = [
		{
			id: [1],
			access: ['*'],
			name: ['Administrador'],
		},
		{
			id: [2],
			access: ['menu', 'menu.home', 'process', 'process.orders'],
			name: ['Cliente'],
		},
		{
			id: [3, 4],
			access: [
				'menu',
				'menu.home',
				'process',
				'process.assigned-services',
			],
			name: ['Proveedor', 'Contratista'],
		},
		{
			id: [5],
			access: ['menu', 'menu.home', 'process', 'process.orders'],
			name: ['Facilitador'],
		},
		{
			id: [6],
			access: [
				'menu',
				'menu.home',
				'process',
				'process.orders',
				'process.assigned-services',
			],
			name: ['Facturacion'],
		},
		{
			id: [7],
			access: [
				'menu',
				'menu.home',
				'process',
				'process.orders',
				'process.assigned-services',
			],
			name: ['Administrativo'],
		},
	];

	constructor(private _storage: StorageService) { }

	getMenu(): any[] {
		return this.menu;
	}

	getMenuByRole(idrole: Id): any[] {
		const seccionesPermitidas: Menu = this.roleAccesMenu.find(e => e.id.includes(idrole));

		if (seccionesPermitidas.access.find(e => e.includes('*'))) {
			return this.menu;
		}

		return this.menu
			.filter((e: any) => seccionesPermitidas.access.includes(e.id))
			.map((e) => {
				e.children = e.children.filter(x =>
					seccionesPermitidas.access.includes(x.id)
				);
				return e;
			});
	}

	getAccess(): any[] {
		return;
	}

	getAccessByRole(): any[] {
		return;
	}
}
