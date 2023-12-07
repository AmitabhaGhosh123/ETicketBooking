import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  private _bookTicketUrl = "http://localhost:3000/api/bookticket";
  constructor(private http:HttpClient) { }

  bookTickets(ticketDetails:any) {
    return this.http.post<any>(this._bookTicketUrl,ticketDetails);
  }
}
