const navigation = [
	{
		id: 'admin',
		title: 'Menú',
		subtitle: '',
		type: 'group',
		icon: 'heroicons_outline:user',
		children: [
			{
				id: 'menu.home',
				title: 'Inicio',
				type: 'basic',
				icon: 'heroicons_outline:home',
				link: '/dashboard/home',
			},
			{
				id: 'divider-2',
				type: 'divider',
			},
			{
				id: 'menu.users',
				title: 'Usuarios',
				type: 'basic',
				icon: 'heroicons_outline:users',
				link: '/dashboard/users',
			},
			{
				id: 'admin.clients',
				title: 'Clientes',
				type: 'basic',
				icon: 'heroicons_outline:document-report',
				link: '/dashboard/clients',
			},
			{
				id: 'menu.roles',
				title: 'Roles',
				type: 'basic',
				icon: 'heroicons_outline:key',
				link: '/dashboard/roles',
			}
		],
	},
	{
		id: 'divider-2',
		type: 'divider',
	},
];

export { navigation };
