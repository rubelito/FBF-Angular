import { RouterModule, Routes} from '@angular/router';
import { NgModule } from '@angular/core';
import { ItemComponent } from './item.component';

const itemRoutes: Routes = [
    {path: '', component: ItemComponent}
]

@NgModule({
    imports: [RouterModule.forChild(itemRoutes)],
    exports: [RouterModule]
})
export class ItemRoutingModule {}