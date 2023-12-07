import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrapingService {

  private _endpointUrl = "http://localhost:4000/api";
  constructor(private http:HttpClient) { }

  scrapeUrl(url:any) {
    return this.http.post<any>(this._endpointUrl+"/scrapeUrl",url);
  }

  getWebsiteData() {
    return this.http.get<any>(this._endpointUrl+"/websiteData");
  }

  upload(file: File) {
    const formData: FormData = new FormData();
    formData.append('file',file);
    return this.http.post(this._endpointUrl+"/upload",formData, {
      reportProgress: true,
      responseType: 'json'
    })
  }

  getFile() {
    return this.http.get(this._endpointUrl+"/file");
  }
}
