import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userRole: string = "";

  constructor(public _authService:AuthService) { 
    if(this._authService.loggedIn) {
      this.userRole = localStorage.getItem("role");
    }
  }

  ngOnInit(): void {
  }

   /* function to logout user */
   logOutUser() {
    localStorage.removeItem('token');
  }

}
