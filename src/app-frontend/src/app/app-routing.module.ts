import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { CustomersComponent } from './pages/customers/customers/customers.component';
import { CostumerComponent } from './pages/customers/costumer/costumer.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'customer', component: CostumerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
