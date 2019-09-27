import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { HeaderComponent } from './header/header.component';
import { MenuHeaderComponent } from './menu-header/menu-header.component';


@NgModule({
    declarations: [
        HeaderComponent
        ,MenuHeaderComponent
    ],
    exports: [
        HeaderComponent
        ,MenuHeaderComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule
    ],
})
export class ComponentsModule{}