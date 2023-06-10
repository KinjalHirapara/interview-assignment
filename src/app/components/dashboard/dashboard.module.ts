import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HeaderComponent } from 'src/app/shared-component/header/header.component';

import { FormsModule } from '@angular/forms';
import { DeleteModalComponent } from 'src/app/delete-modal/delete-modal.component';

@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    DeleteModalComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule
  ]
})
export class DashboardModule { }
