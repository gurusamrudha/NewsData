import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { MatSelectModule } from '@angular/material/select';
import { CardsComponent } from './card/cards.component';

const MaterialModules = [
  MatButtonModule,
  MatPaginatorModule,
  MatExpansionModule,
  MatIconModule,
  MatProgressBarModule,
  MatBadgeModule,
  MatCardModule,
  MatSelectModule
];

@NgModule({
  declarations: [ToolbarComponent, SpinnerComponent, CardsComponent],
  imports: [MaterialModules, BrowserModule],
  exports: [ToolbarComponent, SpinnerComponent, CardsComponent]
})
export class SharedModule { }
