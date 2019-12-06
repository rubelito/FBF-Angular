import { RouterModule, Routes} from '@angular/router';
import { NgModule } from '@angular/core';
import { ReturnedItemComponent } from './returneditem.component';

const itemRoutes: Routes = [
    {path: '', component: ReturnedItemComponent}
]

@NgModule({
    imports: [RouterModule.forChild(itemRoutes)],
    exports: [RouterModule]
})
export class ReturnedItemRoutingModule {}