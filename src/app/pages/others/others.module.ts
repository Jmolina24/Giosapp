import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OthersRoutingModule } from './others-routing.module';
import { Error404Component } from 'app/modules/others/error-404/error-404.component';


@NgModule({
  declarations: [Error404Component],
  imports: [
    CommonModule,
    OthersRoutingModule
  ]
})
export class OthersModule { }
