import { RouterModule, Routes} from '@angular/router';
import { NgModule } from '@angular/core';
import { DRComponent } from './dr.component';

const drRoutes: Routes = [
    {path: '', component: DRComponent}
]

@NgModule({
    imports: [RouterModule.forChild(drRoutes)],
    exports: [RouterModule]
})
export class DRRoutingModule {}