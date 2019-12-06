import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report.component';
import { ReportRoutingModule } from './report-routing.module';


@NgModule({
    declarations: [
        ReportComponent
    ],
    imports: [
        CommonModule,
        ReportRoutingModule
    ],
    providers: []
  })
  export class ReportModule { }