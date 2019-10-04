import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { NavController } from '@ionic/angular';
import { BasketService } from 'src/app/services/basket.service';
import { TrivialService } from 'src/app/services/trivial.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.page.html',
  styleUrls: ['./basket.page.scss'],
})
export class BasketPage implements OnInit {
  @ViewChild(HeaderComponent, null) header: HeaderComponent;
  basket: any;
  button = {
    status: '',
    way: ''
  }
  constructor(
    private navCtrl: NavController,
    private basketS: BasketService,
    private trivial: TrivialService
  ) { }

  ngOnInit(){ 
    this.header.setHeaderTitle('Корзина'); 
    this.header.setCountBasketItem();
  }

  ionViewWillEnter(){
    this.basket = this.basketS.getBasket();
    this.generateButton();
    this.header.setCountBasketItem();
  }

  removeItem(shawa: any){
    this.basketS.removeItem(shawa);
    this.generateButton();
  }

  generateButton(){
    if(!this.basket.shawas.length) {
      this.button = {
        status: 'Выбрать шаурму!',
        way: 'menu/select-shava'
      }
    }
    else if(!localStorage.getItem('eater-geoposition')){
      this.button = {
        status: 'Куда доставить?',
        way: 'menu/home'
      }
    }
    else {
      this.button = {
        status: 'Сделать заказ!',
        way: 'menu/payment'
      }
    }
  }

  generateCount(id: string, count: number, type: '+'|'-'){
    this.basket.shawas.forEach(item => {
      if(item.id == id){
        if(type == '+') this.basketS.updateCountItem(id, ++count);
        else if(type == '-') count == 1 ? this.trivial.showToast('Минимум одна шаурма', 1000) : this.basketS.updateCountItem(id, --count);
      }
      // !(item.id == id) ? null : type == '+' ? this.basketS.updateCountItem(id, ++count) : count == 1 ? this.trivial.showToast('Минимум одна шаурма', 1000) : this.basketS.updateCountItem(id, --count);
    });
  }

  nextStep(way: string){
    console.log('basket', this.basket);
    this.navCtrl.navigateForward(way);
  }

}
