import { Injectable } from '@angular/core';

import Swal from 'sweetalert2';
import { SweetAlertResult, SweetAlertOptions } from 'sweetalert2';

@Injectable({
	providedIn: 'root',
})
export class SweetAlertService {
	constructor() {}

	async confirm(data: SweetAlertOptions): Promise<SweetAlertResult> {
		return await Swal.fire({
			...data
		});
	}
}
