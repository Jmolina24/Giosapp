const navigation = [
	{
		id: 'admin',
		title: 'Menú',
		subtitle: '',
		type: 'collapsable',
		icon: 'heroicons_outline:home',
		children: [
			{
				id: 'menu.home',
				title: 'Inicio',
				type: 'basic',
				icon: 'heroicons_outline:home',
				link: '/dashboard/home',
			},
			{
				id: 'menu.settings',
				title: 'Parametrización',
				type: 'basic',
				icon: 'heroicons_outline:cog',
				link: '/dashboard/parameter-setting',
			}
		],
	},
	// {
	// 	id: 'divider-2',
	// 	type: 'divider',
	// },
	{
		id: 'access',
		title: 'Acceso',
		subtitle: '',
		type: 'collapsable',
		icon: 'heroicons_outline:key',
		children: [
			{
				id: 'menu.roles',
				title: 'Roles',
				type: 'basic',
				icon: 'heroicons_outline:key',
				link: '/dashboard/roles',
			},
			{
				id: 'menu.users',
				title: 'Usuarios',
				type: 'basic',
				icon: 'heroicons_outline:users',
				link: '/dashboard/users',
			}
		]
	},
	// {
	// 	id: 'divider-2',
	// 	type: 'divider',
	// },
	{
		id: 'administration',
		title: 'Administración',
		subtitle: '',
		type: 'collapsable',
		icon: 'mat_outline:dashboard',
		children: [
			{
				id: 'admin.clients',
				title: 'Clientes',
				type: 'basic',
				icon: 'heroicons_outline:document-report',
				link: '/dashboard/clients',
			},
			{
				id: 'menu.services',
				title: 'Servicios',
				type: 'basic',
				icon: 'heroicons_outline:view-list',
				link: '/dashboard/services',
			},
			{
				id: 'menu.third-parties',
				title: 'Terceros',
				type: 'basic',
				icon: 'heroicons_outline:user',
				link: '/dashboard/third-parties',
			},
			{
				id: 'menu.rates',
				title: 'Tarifario',
				type: 'basic',
				icon: 'mat_outline:library_books',
				link: '/dashboard/rates',
			},
		]
	},
	{
		id: 'process',
		title: 'Procesos',
		subtitle: '',
		type: 'collapsable',
		icon: 'mat_outline:pie_chart_outline',
		children: [
			{
				id: 'menu.orders',
				title: 'Ordenes',
				type: 'basic',
				icon: 'heroicons_outline:clipboard-list',
				link: '/dashboard/orders',
			},
			{
				id: 'menu.assigned-services',
				title: 'Servicios asignados',
				type: 'basic',
				icon: 'mat_outline:ballot',
				link: '/dashboard/assigned-services',
			},
		]
	}
];

export { navigation };
