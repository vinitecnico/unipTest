import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { GerenciarMenuComponent } from './components/gerenciar-menu/gerenciar-menu.component';

const routes: Routes = [
  { path: '', redirectTo: '/gerenciar-menu', pathMatch: 'full' },
  { path: 'gerenciar-menu', component: GerenciarMenuComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
