import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePickerComponent } from './date-picker/date-picker.component';

@NgModule({
	imports: [CommonModule, FormsModule, ReactiveFormsModule],
	exports: [CommonModule, FormsModule, ReactiveFormsModule],
	declarations: [
		DatePickerComponent
	],
})
export class SharedModule { }
