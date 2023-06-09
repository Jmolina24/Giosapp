import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'setTimeDifference'
})
export class SetTimeDifferencePipe implements PipeTransform {

	transform(value: string): string {
		const fecha = new Date(value);
		fecha.setHours(fecha.getHours() + 5);

		return fecha.toLocaleString();
	}

}
