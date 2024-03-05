import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, CanActivate } from '@angular/router';

import { AuthGuard } from './auth.guard';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [],
  providers: [
    AuthGuard,
  ]
})
export class GuardsModule { }