import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MenuPage } from './menu.page';
import { ComponentsModule } from './../../components/components.module';
import { SelectShavaPageModule } from '../select-shava/select-shava.module'
const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [ 
      { 
        path: '',
        redirectTo: '/menu/select-shava',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: '../home/home.module#HomePageModule'
      },
      { 
        path: 'select-shava', 
        loadChildren: '../select-shava/select-shava.module#SelectShavaPageModule' 
      },
      { 
        path: 'repeat-message', 
        loadChildren: '../repeat-message/repeat-message.module#RepeatMessagePageModule' 
      },
      { 
        path: 'payment', 
        loadChildren: '../payment/payment.module#PaymentPageModule' 
      },
      { 
        path: 'basket', 
        loadChildren: '../basket/basket.module#BasketPageModule' 
      },
      { 
        path: 'profile', 
        loadChildren: '../profile/profile.module#ProfilePageModule' 
      },
      { 
        path: 'orders', 
        loadChildren: '../orders/orders.module#OrdersPageModule' 
      },
      {
        path: 'cooking',
        loadChildren: '../cooking/cooking.module#CookingPageModule'
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuPage]
})
export class MenuPageModule { }
