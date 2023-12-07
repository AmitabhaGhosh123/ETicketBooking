import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {

  createEventForm:FormGroup;
  eventSuccessMessage: string = "";
  eventErrorMessage: string = "";
  showAlerts: boolean = false;
  showSuccessMessage: boolean = false;
  showErrorMessage: boolean = false;
  
  constructor(private fb:FormBuilder,private _eventService:EventsService) { }

  ngOnInit(): void {
    this.createEventForm = this.fb.group({
      eventName: ['',Validators.required],
      eventPrice: ['',Validators.required],
      eventPriceCurrency: ['INR'],
      eventVenue: ['',Validators.required],
      eventDate: ['',Validators.required]
    })
  }

  /*function for event creation */
  createEvent(val:any) {
    val.value.eventStatus = "Scheduled";
    this._eventService.createEvent(val.value).subscribe((res) => {
      this.showSuccessMessage = true;
      this.showErrorMessage = false;
      this.eventSuccessMessage = res.message;
      this.createEventForm.reset();
    },
    (error) => {
      this.showErrorMessage = true;
      this.showSuccessMessage = false;
      this.eventErrorMessage = error;
    })
  }

}
