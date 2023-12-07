import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ScrapingService } from 'src/app/services/scraping.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  searchForm: FormGroup;
  websiteUrl: string = "";
  websiteName: string = "";
  websiteLogo: string = "";
  websiteDescription: string = "";
  websiteKeywords: string = "";
  errorMessage: string = "";

  constructor(private fb: FormBuilder,public scrape:ScrapingService,private _router:Router) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      websiteUrl: [''],
    })
  }

  submit(val:any) {
    this.scrape.scrapeUrl(val.value).subscribe((res)=> {
      const websiteName = val.value.websiteUrl.split('.')[1];
      this._router.navigate([`website/${websiteName}`]);
    },
    (error)=> {
      this.errorMessage = error.errorMessage;
    })
  }
}
