import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculatorFormComponent } from './calculator-form/calculator-form.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { PopupFormComponent } from './popup-form/popup-form.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';

const routes: Routes = [

  { path: '', component: HomePageComponent},
   { path: 'calculate', component: CalculatorFormComponent , data: {animation:'togglePage'}},
   { path: 'admin', component: AdminPanelComponent },
   { path: 'popup', component: PopupFormComponent },
   { path: 'adminlogin', component: AdminLoginComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule,
  ]
})
export class AppRoutingModule { }
