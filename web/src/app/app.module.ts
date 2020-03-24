import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelect2Module } from 'ng-select2';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { DataTablesModule } from 'angular-datatables';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

import { ApiService } from './service/api.service';

const appRoutes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: '**', 
    redirectTo: 'home',
    pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    PageNotFoundComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    BrowserModule,
    HttpClientModule,
    NgxPaginationModule,
    NgSelect2Module,
    FormsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    DataTablesModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
