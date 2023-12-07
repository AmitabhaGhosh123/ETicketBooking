import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventsService } from 'src/app/services/events.service';
import { TicketsService } from 'src/app/services/tickets.service';

@Component({
  selector: 'app-view-events',
  templateUrl: './view-events.component.html',
  styleUrls: ['./view-events.component.scss']
})
export class ViewEventsComponent implements OnInit {

  eventsList:any[] = [];
  successMessage: string = "";
  errorMessage: string = "";
  updatedObj = {};
  showErrorMessage: boolean = false;
  showSuccessMessage: boolean = false;
  userRole: string = "";
  bookTicketForm:FormGroup;
  openedEventName: string = "";
  openedEventPrice: number;
  noOfTicketsToBook: number;
  totalPayableAmount: number;
  ticketBookSuccessMessage: string = "";
  ticketBookErrorMessage: string = "";

  constructor(private _eventsService:EventsService,private _ticketService:TicketsService,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.bookTicketForm = this.fb.group({
      noOfTickets: [1,Validators.required],
      mobileNumber: ['',Validators.required]
    })
    this.userRole = localStorage.getItem('role');
    this.getListOfEvents();
  }

  /*function to get list of events */
  getListOfEvents() {
    this._eventsService.listOfEvents().subscribe((res) => {
      this.eventsList = res.allEvents;
    },
    (error) => {
      this.eventsList = [];
    })
  }

  /*function for updating the event */
  updateEvent(event:any,value:number) {
    for(let i=0; i<this.eventsList.length; i++) {
      if(value == i) {
        this.eventsList[i].eventStatus = "Cancelled";
        event.eventStatus = this.eventsList[i].eventStatus;
      }
    }
    this.updatedObj['eventName'] = event.eventName;
    this.updatedObj['eventPrice'] = event.eventPrice;
    this.updatedObj['eventVenue'] = event.eventVenue;
    this.updatedObj['eventDate'] = event.eventDate;
    this.updatedObj['eventStatus'] = event.eventStatus;
    this._eventsService.updateEvent(this.updatedObj,event._id).subscribe((res) => {
      this.showSuccessMessage = true;
      this.showErrorMessage = false;
      this.successMessage = res.message;
    },
    (error) => {
      this.showErrorMessage = true;
      this.showSuccessMessage = false;
      this.errorMessage = error;
    })
  }

  /*function for opening the bookticket modal*/
  open(event:any) {
    $('#bookTicketModal').modal('show');
    this.openedEventName = event.eventName;
    this.openedEventPrice = event.eventPrice;
    this.noOfTicketsToBook = this.bookTicketForm.controls['noOfTickets'].value;
    this.totalPayableAmount = this.openedEventPrice * this.noOfTicketsToBook;
  }

  /*function for changing the no of tickets*/
  onChangeNoOfTickets() {
    this.noOfTicketsToBook = this.bookTicketForm.controls['noOfTickets'].value;
    this.totalPayableAmount = this.openedEventPrice * this.noOfTicketsToBook;
  }
  
  /*function for booking ticket by guest user */
  bookTicket(val:any) {
    val.value.Name = localStorage.getItem('username');
    val.value.bookedEventName = this.openedEventName;
    this._ticketService.bookTickets(val.value).subscribe((resp) => {
      this.showSuccessMessage = true;
      this.showErrorMessage = false;
      this.ticketBookSuccessMessage = resp.message;
      this.bookTicketForm.reset();
    },
    (error) => {
      this.showErrorMessage = true;
      this.showSuccessMessage = false;
      this.ticketBookErrorMessage = error;
    })
  }

}
