import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from 'app/modules/main/home/home.component';
import { UsersComponent } from 'app/modules/main/users/users.component';
import { ClientsComponent } from 'app/modules/main/clients/clients.component';
import { RolesComponent } from 'app/modules/main/roles/roles.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from 'app/shared/shared.module';
import { DetailSiteComponent } from 'app/modules/main/clients/detail-site/detail-site.component';
import { MatIconModule } from '@angular/material/icon';
import { OrdersComponent } from 'app/modules/main/orders/orders.component';
import { ServicesComponent } from 'app/modules/main/services/services.component';
import { ThirdPartiesComponent } from 'app/modules/main/third-parties/third-parties.component';


@NgModule({
	declarations: [HomeComponent, UsersComponent, ClientsComponent, RolesComponent, DetailSiteComponent, OrdersComponent, ServicesComponent, ThirdPartiesComponent],
	imports: [
		CommonModule,
		MainRoutingModule,
		MatFormFieldModule,
		MatSelectModule,
		MatIconModule,
		SharedModule
	]
})
export class MainModule { }
