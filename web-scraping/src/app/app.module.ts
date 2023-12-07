import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrapingService } from './services/scraping.service';
import { WebsiteDetailsComponent } from './components/website-details/website-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    WebsiteDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ScrapingService],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }
