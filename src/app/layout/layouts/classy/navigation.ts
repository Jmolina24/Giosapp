const navigation = [
	{
		id: 'home',
		title: 'Inicio',
		subtitle: '',
		type: 'basic',
		icon: 'heroicons_outline:home',
		link: '/panel/inicio',
		actions: [],
		children: []
	},
	{
		id: 'parameterization',
		title: 'Parametrización',
		type: 'basic',
		icon: 'heroicons_outline:cog',
		link: '/panel/parametrizacion',
		actions: [
			{ id: 'create', status: false, title: 'Crear' },
			{ id: 'edit', status: false, title: 'Editar' },
			{ id: 'list', status: false, title: 'Listar' },
			{
				id: 'changeStatus',
				status: false,
				title: 'Cambiar de Estado',
			},
		],
		children: []
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
				actions: [
					{ id: 'create', status: false, title: 'Crear' },
					{ id: 'edit', status: false, title: 'Editar' },
					{ id: 'list', status: false, title: 'Listar' },
					{
						id: 'changeStatus',
						status: false,
						title: 'Cambiar de Estado',
					},
				],
			},
			{
				id: 'access.users',
				title: 'Usuarios',
				type: 'basic',
				icon: 'heroicons_outline:users',
				link: '/panel/usuarios',
				actions: [
					{ id: 'create', status: false, title: 'Crear' },
					{ id: 'edit', status: false, title: 'Editar' },
					{ id: 'list', status: false, title: 'Listar' },
					{
						id: 'changeStatus',
						status: false,
						title: 'Cambiar de Estado',
					},
				],
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
				actions: [
					{ id: 'create', status: false, title: 'Crear' },
					{ id: 'edit', status: false, title: 'Editar' },
					{ id: 'list', status: false, title: 'Listar' },
					{
						id: 'changeStatus',
						status: false,
						title: 'Cambiar de Estado',
					},
					{ id: 'view_sites', status: false, title: 'Ver Sedes' },
					{ id: 'create_site', status: false, title: 'Crear Sede' },
					{ id: 'edit_site', status: false, title: 'Editar Sede' },
				],
			},
			{
				id: 'administration.services',
				title: 'Servicios',
				type: 'basic',
				icon: 'heroicons_outline:view-list',
				link: '/panel/servicios',
				actions: [
					{ id: 'create', status: false, title: 'Crear' },
					{ id: 'edit', status: false, title: 'Editar' },
					{ id: 'list', status: false, title: 'Listar' },
					{
						id: 'changeStatus',
						status: false,
						title: 'Cambiar de Estado',
					},
				],
			},
			{
				id: 'administration.third-parties',
				title: 'Terceros',
				type: 'basic',
				icon: 'heroicons_outline:user',
				link: '/panel/terceros',
				actions: [
					{ id: 'create', status: false, title: 'Crear' },
					{ id: 'edit', status: false, title: 'Editar' },
					{ id: 'list', status: false, title: 'Listar' },
					{
						id: 'changeStatus',
						status: false,
						title: 'Cambiar de Estado',
					},
				],
			},
			{
				id: 'administration.rates',
				title: 'Tarifario',
				type: 'basic',
				icon: 'mat_outline:library_books',
				link: '/panel/tarifarios',
				actions: [
					{ id: 'create', status: false, title: 'Crear' },
					{ id: 'edit', status: false, title: 'Editar' },
					{ id: 'list', status: false, title: 'Listar' },
					{
						id: 'changeStatus',
						status: false,
						title: 'Cambiar de Estado',
					},
				],
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
				actions: [
					{ id: 'create', status: false, title: 'Crear' },
					{ id: 'edit', status: false, title: 'Editar' },
					{ id: 'list', status: false, title: 'Listar' },
					{
						id: 'changeStatusDetail',
						status: false,
						title: 'Cambiar de Estado Detalle',
					},
					{ id: 'view_details', status: false, title: 'Ver Detalle' },
					{
						id: 'create_detail',
						status: false,
						title: 'Crear Detalle',
					},
					{
						id: 'edit_detail',
						status: false,
						title: 'Editar Detalle',
					},
					{
						id: 'assign_detail',
						status: false,
						title: 'Asignar Detalle',
					},
					{
						id: 'upload_support',
						status: false,
						title: 'Cargar Soporte',
					},
					{
						id: 'view_support',
						status: false,
						title: 'Visualizar Soporte',
					},
				],
			},
			{
				id: 'process.assigned-services',
				title: 'Servicios asignados',
				type: 'basic',
				icon: 'mat_outline:ballot',
				link: '/panel/servicios-asignados',
				actions: [
					{
						id: 'changeStatusDetail',
						status: false,
						title: 'Cambiar de Estado Detalle',
					},
					{ id: 'view_details', status: false, title: 'Ver Detalle' },
					{
						id: 'create_detail',
						status: false,
						title: 'Crear Detalle',
					},
					{
						id: 'edit_detail',
						status: false,
						title: 'Editar Detalle',
					},
					{
						id: 'assign_detail',
						status: false,
						title: 'Asignar Detalle',
					},
					{
						id: 'upload_support',
						status: false,
						title: 'Cargar Soporte',
					},
					{
						id: 'view_support',
						status: false,
						title: 'Visualizar Soporte',
					},
				],
			},
		],
	},
];
export { navigation };
