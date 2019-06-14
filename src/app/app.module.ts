import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BlockUIModule } from 'ng-block-ui';
import { BlockUIHttpModule } from 'ng-block-ui/http';
import { NgbModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { CollapseModule, BsDropdownModule } from 'ngx-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import {
  MatListModule,
  MatMenuModule,
  MatButtonModule,
  MatDialogModule,
  MatPaginatorModule,
  MatTableModule,
  MatFormFieldModule,
  MatIconModule,
  MatSortModule,
  MatSelectModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatExpansionModule
} from '@angular/material';

import { StartupConfigService } from './services/startup.config.service';

export function StartupConfigServiceFactory(startupConfigService: StartupConfigService) {
  const domain = startupConfigService.getConfig();
  console.log(domain);
  startupConfigService.value = domain;
  return domain;
}

// component
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { GerenciarMenuComponent } from './components/gerenciar-menu/gerenciar-menu.component';
import { MenuModalComponent } from './components/menu-modal/menu-modal.component';

// services
import { MenuService } from './services/menu.service';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    GerenciarMenuComponent,
    MenuModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,   
    AppRoutingModule,
    NgbModule.forRoot(),
    NgbCollapseModule,
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    BlockUIModule.forRoot(),
    BlockUIHttpModule.forRoot(),
    BrowserAnimationsModule,
    MatListModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatIconModule,
    MatSortModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    HttpClientModule
  ],
  providers: [MenuService, StartupConfigService],
  entryComponents: [MenuModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
