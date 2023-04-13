import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculatorFormComponent } from './calculator-form/calculator-form.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { PopupFormComponent } from './popup-form/popup-form.component';

const routes: Routes = [



  { path: '', component: HomePageComponent},
   { path: 'calculate', component: CalculatorFormComponent },
   { path: 'admin', component: AdminPanelComponent },
   { path: 'popup', component: PopupFormComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  
  exports: [RouterModule,
  ]
})
export class AppRoutingModule { }
