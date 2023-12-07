import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { BookTicketComponent } from './book-ticket/book-ticket.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { ViewordersComponent } from './vieworders/vieworders.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewEventsComponent } from './view-events/view-events.component';

@NgModule({
  declarations: [DashboardComponent, BookTicketComponent, CreateEventComponent, ViewordersComponent, ViewEventsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
