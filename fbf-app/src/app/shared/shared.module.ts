import { NgModule } from '@angular/core';
import { OnlyNumber } from '../helper/numberonly.directive';


@NgModule({
    declarations: [OnlyNumber],
    exports: [OnlyNumber]    
  })
  export class SharedModule { }