const navigation = [
	{
		id: 'menu',
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
				link: '/panel/inicio',
			},
			{
				id: 'menu.settings',
				title: 'Parametrización',
				type: 'basic',
				icon: 'heroicons_outline:cog',
				link: '/panel/parametrizacion',
			},
		],
	},
	{
		id: 'access',
		title: 'Acceso',
		subtitle: '',
		type: 'collapsable',
		icon: 'heroicons_outline:key',
		children: [
			{
				id: 'access.roles',
				title: 'Roles',
				type: 'basic',
				icon: 'heroicons_outline:key',
				link: '/panel/roles',
			},
			{
				id: 'access.users',
				title: 'Usuarios',
				type: 'basic',
				icon: 'heroicons_outline:users',
				link: '/panel/usuarios',
			},
		],
	},
	{
		id: 'administration',
		title: 'Administración',
		subtitle: '',
		type: 'collapsable',
		icon: 'mat_outline:dashboard',
		children: [
			{
				id: 'administration.clients',
				title: 'Clientes',
				type: 'basic',
				icon: 'heroicons_outline:document-report',
				link: '/panel/clientes',
			},
			{
				id: 'administration.services',
				title: 'Servicios',
				type: 'basic',
				icon: 'heroicons_outline:view-list',
				link: '/panel/servicios',
			},
			{
				id: 'administration.third-parties',
				title: 'Terceros',
				type: 'basic',
				icon: 'heroicons_outline:user',
				link: '/panel/terceros',
			},
			{
				id: 'administration.rates',
				title: 'Tarifario',
				type: 'basic',
				icon: 'mat_outline:library_books',
				link: '/panel/tarifarios',
			},
		],
	},
	{
		id: 'process',
		title: 'Procesos',
		subtitle: '',
		type: 'collapsable',
		icon: 'mat_outline:pie_chart_outline',
		children: [
			{
				id: 'process.orders',
				title: 'Ordenes',
				type: 'basic',
				icon: 'heroicons_outline:clipboard-list',
				link: '/panel/ordenes',
			},
			{
				id: 'process.assigned-services',
				title: 'Servicios asignados',
				type: 'basic',
				icon: 'mat_outline:ballot',
				link: '/panel/servicios-asignados',
			},
		],
	},
];
export { navigation };
