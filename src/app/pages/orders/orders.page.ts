import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { NavController } from '@ionic/angular';
import { TrivialService } from 'src/app/services/trivial.service';
import { BasketService } from 'src/app/services/basket.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  @ViewChild(HeaderComponent, null) header: HeaderComponent;
  constructor(
    private navCtrl: NavController,
    private trivial: TrivialService,
    private basketService: BasketService,
  ) {}

  ngOnInit() {
    this.header.setHeaderTitle('Мои заказы');
  }

  ionViewWillEnter(){
    this.header.setCountBasketItem();
  }

}
