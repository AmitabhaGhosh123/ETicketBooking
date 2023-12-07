import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { RoleGuard } from 'src/app/guards/role.guard';
import { BookTicketComponent } from './book-ticket/book-ticket.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { DashboardComponent } from './dashboard.component';
import { ViewEventsComponent } from './view-events/view-events.component';
import { ViewordersComponent } from './vieworders/vieworders.component';

const routes: Routes = [
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    children: [
    {
      path: 'createevent',
      component: CreateEventComponent,
      canActivate: [AuthGuard,RoleGuard],
      data: {
        role: 'Admin'
      }
    },
    {
      path: 'vieworders',
      component: ViewordersComponent,
      canActivate: [AuthGuard,RoleGuard],
      data: {
        role: 'Admin'
      }
    },
    {
      path: 'viewevents',
      component: ViewEventsComponent,
      canActivate: [AuthGuard,RoleGuard],
      data: {
        role: 'Admin'
      }
    },
    {
      path: 'booktickets',
      component: BookTicketComponent,
    }
   ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
