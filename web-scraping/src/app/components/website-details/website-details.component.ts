import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ScrapingService } from 'src/app/services/scraping.service';

@Component({
  selector: 'app-website-details',
  templateUrl: './website-details.component.html',
  styleUrls: ['./website-details.component.scss']
})
export class WebsiteDetailsComponent implements OnInit {

  websiteUrl: string = "";
  websiteName: string = "";
  websiteLogo: string = "";
  uploadedWebsiteLogo: string = "";
  websiteLogoColors = [];
  websiteLogoFileName: string = "";
  websiteDescription: string = "";
  websiteKeywords: string = "";
  websiteForm: FormGroup;
  errorMessage: string = "";
  selectedFiles: FileList;
  currentFile: File;
  message: string = "";
  fileUploadSuccessMessage: string = "";
  fileUploadErrorMessage: string = "";
  colorsArr = [];

  constructor(public _scrape:ScrapingService,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.websiteForm = this.fb.group({
      websiteUrl: [''],
      websiteName:[''],
      websiteDescription:[''],
      websiteKeyword:['']
    })
    this.extractWebsiteData();
  }

  extractWebsiteData() {
    this._scrape.getWebsiteData().subscribe(value=> {
      this.websiteUrl = value[0].BrandWebsiteURL;
      this.websiteName = value[0].BrandWebsiteName;
      this.websiteLogo = value[0].BrandWebsiteLogo;
      this.websiteLogoColors = value[0].BrandWebsiteLogoColors;
      this.websiteDescription = value[0].BrandWebsiteDescription;
      this.websiteKeywords = value[0].BrandWebsiteKeywords;     
    },
    (error)=>{
      this.errorMessage = error.errorMessage;
    })
  }

  selectFile(event:any) {
    this.selectedFiles = event.target.files;
    this.currentFile = this.selectedFiles.item(0);
    this._scrape.upload(this.currentFile).subscribe((value:any) => {
      this.fileUploadSuccessMessage = value.message;
      this.getFile();
    },
    (error)=> {
      this.fileUploadErrorMessage = "Could not upload file";
    })
  }

  getFile() {
    this._scrape.getFile().subscribe(file => {
      this.uploadedWebsiteLogo = file[0].url;
      this.websiteLogoFileName = file[0].name;
      this.websiteLogo = this.uploadedWebsiteLogo;
    },
    (error)=> {

    })
  }

}
