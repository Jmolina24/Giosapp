import { Injectable } from '@angular/core';
import { navigation } from 'app/layout/layouts/classy/navigation';
import { StorageService } from '../helpers/storage.service';

type Id = 1 | 2 | 3 | 4 | 5 | 6 | 7;

type Modules =
	| 'home'
	| 'parameterization'
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
	| 'process.assigned-services';


export type Action =
	| 'create'
	| 'edit'
	| 'list'
	| 'changeStatus'
	| 'view_sites'
	| 'create_site'
	| 'edit_site'
	| 'changeStatusDetail'
	| 'view_details'
	| 'create_detail'
	| 'edit_detail'
	| 'assign_detail'
	| 'upload_support'
	| 'view_support';

@Injectable({
	providedIn: 'root',
})
export class MenuService {
	menu: any[] = JSON.parse(JSON.stringify(navigation));

	constructor(private _storage: StorageService) {}

	getMenu(): any[] {
		return this.menu;
	}

	getMenuByRole(idrole: Id): any[] {
		let menu = [];
		menu = JSON.parse(JSON.stringify(this.menu));

		if (idrole === 1) {
			return menu;
		}

		const access: any[] = this._storage
			.getMenu()
			.map((e: { id: any }) => e.id);

		return menu
			.map((item) => {
				if (item.type !== 'basic') {
					item.children = item.children
						.filter((e: { id: any }) => access.includes(e.id))
						.map(
							(e: {
								id: any;
								actions: { [x: number]: boolean }[];
							}) => {
								const actions: any[] = this._storage
									.getMenu()
									.find(
										(r: { id: any }) => r.id === e.id
									).actions;
								e.actions = actions.map(action => ({
									[action.id]: true,
								}));
								return e;
							}
						);
				}
				item.status =
					item.type !== 'basic'
						? item.children.length > 0
						: access.includes(item.id);
				return item;
			})
			.filter(e => e.status);
	}

	hasAccess(name: Modules): boolean {
		return this._storage
			.getMenu()
			.map((e: { id: any }) => e.id)
			.includes(name);
	}

	getActions(name: Modules): Action[] {
		return (
			this._storage
				.getMenu()
				.find((e: { id: any }) => e.id === name)
				?.actions.map(action => action.id) || []
		);
	}

	getAction(name: Modules, action: Action): boolean {
		return (
			this._storage
				.getMenu()
				.find((e: { id: any }) => e.id === name)
				?.actions.map((e: { id: string }) => e.id).includes(action)
		);
	}

	getMenuOneLevel(idrole: Id): any[] {
		const menu = this.getMenuByRole(idrole);
		const data = menu.filter((e: { type: string }) => e.type === 'basic');
		data.push(
			...menu
				.filter(
					(e: { type: string; children: any[] }) =>
						e.type !== 'basic' || e.children?.length > 0
				)
				.reduce((a, b) => a.concat(b.children), [])
		);
		return data;
	}
}
