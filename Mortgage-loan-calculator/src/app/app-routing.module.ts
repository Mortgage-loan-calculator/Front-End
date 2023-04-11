import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculatorFormComponent } from './calculator-form/calculator-form.component';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [



  { path: 'calculator', component: CalculatorFormComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
