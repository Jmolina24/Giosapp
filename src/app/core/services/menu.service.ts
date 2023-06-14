/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { navigation } from 'app/layout/layouts/classy/navigation';
import { StorageService } from '../helpers/storage.service';

export interface Access {
	name:
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
	actions?: Actions;
}

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
}

export type Actions =
	| {
			create?: boolean;
			edit?: boolean;
			view?: boolean;
			createDetail?: boolean;
			listDetail?: boolean;
			editDetail?: boolean;
			viewDetail?: boolean;
			list?: boolean;
			inactive?: boolean;
			upload?: boolean;
			viewSupport?: boolean;
			changeStatus?: boolean;
			changeStatusDetail?: boolean;
			assign?: boolean;
			viewFn?: { name: string; view: boolean }[];
	  }
	| '*';

@Injectable({
	providedIn: 'root',
})
export class MenuService {
	menu: any[] = JSON.parse(JSON.stringify(navigation));

	private roleAccesMenu: Menu[] = [
		{
			id: [1],
			access: [{ name: '*', actions: '*' }],
			name: ['Administrador'],
		},
		{
			id: [2],
			access: [
				{ name: 'menu', actions: '*' },
				{ name: 'menu.home', actions: '*' },
				{ name: 'process', actions: '*' },
				{
					name: 'process.orders',
					actions: { create: true, list: true, viewDetail: true, listDetail: true },
				},
			],
			name: ['Cliente'],
		},
		{
			id: [3],
			access: [
				{ name: 'menu', actions: '*' },
				{ name: 'menu.home', actions: '*' },
				{ name: 'process', actions: '*' },
				{
					name: 'process.assigned-services',
					actions: { listDetail: true, upload: true, changeStatusDetail: true },
				},
			],
			name: ['Proveedor'],
		},
		{
			id: [4],
			access: [
				{ name: 'menu', actions: '*' },
				{ name: 'menu.home', actions: '*' },
				{ name: 'process', actions: '*' },
				{
					name: 'process.assigned-services',
					actions: { listDetail: true, upload: true, changeStatusDetail: true, viewSupport: true },
				},
			],
			name: ['Contratista'],
		},
		{
			id: [5],
			access: [
				{ name: 'menu', actions: '*' },
				{ name: 'menu.home', actions: '*' },
				{ name: 'process', actions: '*' },
				{
					name: 'process.orders',
					actions: { edit: true, list: true, viewDetail: true, listDetail: true, assign: true, changeStatusDetail: true },
				},
			],
			name: ['Facilitador'],
		},
		{
			id: [6],
			access: [
				{ name: 'menu', actions: '*' },
				{ name: 'menu.home', actions: '*' },
				{ name: 'process', actions: '*' },
				{
					name: 'process.orders',
					actions: { list: true, viewDetail: true, listDetail: true },
				},
				{ name: 'process.assigned-services', actions: { listDetail: true } },
			],
			name: ['Facturacion'],
		},
		{
			id: [7],
			access: [
				{ name: 'menu', actions: '*' },
				{ name: 'menu.home', actions: '*' },
				{ name: 'process', actions: '*' },
				{
					name: 'process.orders',
					actions: { list: true, viewDetail: true, listDetail: true },
				},
				{ name: 'process.assigned-services', actions: { listDetail: true } },
			],
			name: ['Administrativo'],
		},
	];

	constructor() {}

	getMenu(): any[] {
		return this.menu;
	}

	getMenuByRole(idrole: Id): any[] {
		let menu = [];
		menu = JSON.parse(JSON.stringify(this.menu));

		let roleAccesMenu = [];
		roleAccesMenu = JSON.parse(JSON.stringify(this.roleAccesMenu));

		const seccionesPermitidas: Menu = roleAccesMenu.find(e =>
			e.id.includes(idrole)
		);

		if (seccionesPermitidas.access.find(e => e.name.includes('*'))) {
			return menu;
		}

		return menu
			.filter((e: any) =>
				seccionesPermitidas.access.find(y => y.name === e.id)
			)
			.map((e) => {
				e.children = e.children.filter((x: { id: string }) =>
					seccionesPermitidas.access.find(y => y.name === x.id)
				);
				return e;
			});
	}

	getAccessByRole(idrole: any, { name }: Access): Actions {
		let access = JSON.parse(JSON.stringify(this.roleAccesMenu));

		access = access.find((r: { id: string | any[] }) =>
			r.id.includes(idrole)
		);

		if (access.id.includes(1)) {
			return access.access[0].actions;
		}
		return access.access.find((r: { name: string }) => r.name === name)
			?.actions;
	}
}
