import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private _eventCreateUrl = "http://localhost:3000/api/createevent";
  private _eventsListUrl = "http://localhost:3000/api/events";
  constructor(private http:HttpClient) { }

  createEvent(event:any) {
    return this.http.post<any>(this._eventCreateUrl,event);
  }

  listOfEvents() {
    return this.http.get<any>(this._eventsListUrl);
  }

  updateEvent(values:any,_id:string) {
    return this.http.put<any>(`${this._eventsListUrl}/${_id}`,values);
  }
}
