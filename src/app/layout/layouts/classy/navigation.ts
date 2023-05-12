const navigationAdmin: any = [
	{
		id: 'admin',
		title: 'Adminstración',
		subtitle: 'Información general',
		type: 'group',
		icon: 'heroicons_outline:user',
		children: [
			{
				id: 'admin.review',
				title: 'Pendientes',
				type: 'basic',
				icon: 'heroicons_outline:eye',
				link: '/dashboard/admin/review',
			},
			{
				id: 'admin.users',
				title: 'Usuarios',
				type: 'basic',
				icon: 'heroicons_outline:users',
				link: '/dashboard/admin/details/users',
			},
			{
				id: 'admin.reports',
				title: 'Reportes',
				type: 'basic',
				icon: 'heroicons_outline:document-report',
				link: '/dashboard/admin/reports',
			},
		],
	},
	{
		id: 'divider-2',
		type: 'divider',
	},
];

const navigationClient: any = [
	{
		id: 'users',
		title: 'Usuario',
		subtitle: 'Información del usuario',
		type: 'group',
		icon: 'heroicons_outline:users',
		children: [
			{
				id: 'user.profile',
				title: 'Perfil',
				type: 'basic',
				icon: 'heroicons_outline:user-circle',
				link: '/dashboard/user/profile',
			},
		],
	},
	{
		id: 'divider-2',
		type: 'divider',
	},
];

export { navigationAdmin, navigationClient };
