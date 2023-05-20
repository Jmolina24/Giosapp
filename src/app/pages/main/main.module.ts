import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from 'app/modules/main/home/home.component';
import { UsersComponent } from 'app/modules/main/users/users.component';
import { ClientsComponent } from 'app/modules/main/clients/clients.component';
import { RolesComponent } from 'app/modules/main/roles/roles.component';


@NgModule({
  declarations: [HomeComponent, UsersComponent, ClientsComponent, RolesComponent],
  imports: [
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule { }
