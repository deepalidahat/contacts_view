import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { HeaderPageComponent } from './header-page/header-page.component';
import { MainContentComponent } from './main-content/main-content.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HighlightStarDirective } from './highlight-star.directive';

@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    HeaderPageComponent,
    MainContentComponent,
    ContactListComponent,
    ContactDetailComponent,
    HighlightStarDirective
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule, ReactiveFormsModule,
    FontAwesomeModule
  ]
})
export class DashboardModule { }
