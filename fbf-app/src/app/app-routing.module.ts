import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/AuthGuard';

const routes: Routes = [
  { path: 'item', loadChildren: './item/item.module#ItemModule', canActivate:[AuthGuard] },
  { path: 'dr', loadChildren: './dr/dr.module#DRModule', canActivate:[AuthGuard] },
  { path: 'returneditem', loadChildren: './returneditem/returneditem.module#ReturnedItemModule', canActivate:[AuthGuard] },
  { path: 'maintenance', loadChildren: './maintenance/maintenance.module#MaintenanceModule', canActivate:[AuthGuard]},
  { path: 'report', loadChildren: './report/report.module#ReportModule', canActivate:[AuthGuard] },
  { path: 'account', loadChildren: './account/account.module#AccountModule'},
  { path: '', redirectTo: 'dr', pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
