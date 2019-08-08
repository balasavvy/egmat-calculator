import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { SliderComponent } from './home/slider/slider.component';
import { GmatScoreComponent } from './gmat-score/gmat-score.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS, HttpHeaders } from '@angular/common/http';
import { ScoresComponent } from './gmat-score/scores/scores.component';
import { ProgressBarComponent } from './shared/progress-bar/progress-bar.component';
@NgModule({
  declarations: [
    LayoutComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    SliderComponent,
    GmatScoreComponent,
    ScoresComponent,
    ProgressBarComponent
  ],
  exports: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutRoutingModule,
     BrowserAnimationsModule,
    // ToastrModule.forRoot({
    //   timeOut: 2000,
    //   positionClass: 'toast-top-right',
    //   preventDuplicates: true,
    // })
  ]
})
export class LayoutModule { }
