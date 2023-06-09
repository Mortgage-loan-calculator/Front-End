import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { HomePageComponent } from './home-page/home-page.component';
import { CalculatorFormComponent } from './calculator-form/calculator-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { HttpClientModule } from '@angular/common/http';
import { PopupFormComponent } from './popup-form/popup-form.component';
import { MaterialModule } from './material/material.module';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MonthlyPaymentComponent } from './monthly-payment/monthly-payment.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { httpInterceptorProviders } from './admin-login/helpers/http.interceptor';
import { ErrorHandlerService } from './errors/error-handler.service';
import {MatNativeDateModule} from "@angular/material/core";

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    CalculatorFormComponent,
    AdminPanelComponent,
    PopupFormComponent,
    AdminLoginComponent,
    MonthlyPaymentComponent,
    PieChartComponent,
  ],
  imports: [
    NoopAnimationsModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgxSliderModule,
    MatTabsModule,
    HttpClientModule,
    MaterialModule,
    MatGridListModule,
    MatListModule,
    FormsModule,
    MatNativeDateModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
