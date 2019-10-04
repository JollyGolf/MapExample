import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { NavController } from '@ionic/angular';
import { TrivialService } from 'src/app/services/trivial.service';
import { BasketService } from 'src/app/services/basket.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  @ViewChild(HeaderComponent, null) header: HeaderComponent;
  basket: any;

  paymentType: 'cash'|'banking' = 'cash';

  constructor(
    private navCtrl: NavController,
    private trivial: TrivialService,
    private basketService: BasketService,
    private orderService: OrderService
  ) { }

  ngOnInit(){ this.header.setHeaderTitle('Шаг 3: Оплата'); }
  ionViewWillEnter(){
    this.basket = this.basketService.getBasket();
  }
  nextStep(){
    this.orderService.createOrder({
      method: this.paymentType
    });
    // this.navCtrl.navigateForward('menu/cooking');
  }
}
