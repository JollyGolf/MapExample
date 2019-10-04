import { Injectable } from '@angular/core';
import { TrivialService } from './trivial.service';

export interface Shawa {
  id: string,
  name: string,
  price: number,
  count: number
}

@Injectable({
  providedIn: 'root'
})

export class BasketService {
  constructor(private trivial: TrivialService){}

  basket = {
    shawas: [],
    price: 0,
    delivery: 25,
  }

  addItem(shawa: Shawa){
    let updateFlag = false;
    if(this.basket.shawas.length){
      this.basket.shawas.forEach((item, index) => {
        if(item.id == shawa.id) {
          item.count = item.count + shawa.count;
          this.trivial.showToast('Корзина обновлена!', 1000);
          updateFlag = true;
        }
        else if((index + 1 == this.basket.shawas.length) && !updateFlag) {
          this.basket.shawas.push(shawa);
          this.trivial.showToast('Шаурма добавлена в корзину!', 1000);
        }
      });
    }
    else {
      this.basket.shawas.push(shawa);
      this.trivial.showToast('Шаурма добавлена в корзину!!', 1000);
    }
    this.updateFinalPrice();
  }

  updateCountItem(id: string, count: number) {
    this.basket.shawas.forEach((item, index) => {
      if(item.id == id){
        item.count = count;
        this.updateFinalPrice();
      }
    });
   this.getBasket();
  }

  removeItem(shawa: Shawa){
    this.basket.shawas.forEach((item, index) => {
      if(item.id == shawa.id){
        this.basket.shawas.splice(index, 1);
        this.trivial.showToast('Шаурма удалена из корзины!', 1000);
        this.updateFinalPrice();
      }
    });
    this.getBasket();
  }

  updateFinalPrice(){
    let final = this.basket.delivery;
    this.basket.shawas.forEach(item => final += item.price * item.count);
    this.basket.price = final == this.basket.delivery ? 0 : final;
  }

  createOrder(){
    let eaterId = 'getLocalStorage';
    let orderId = 'firebase add automatically';
    let coords = ['lat', 'lang'];
    let order = {
      geopoing: coords,
      id_eater: eaterId,
      price: this.basket.price,
      shawas: this.basket.shawas
    }
    order => console.log(order);
  }

  clearBasket(){
    this.basket = {
      shawas: [],
      price: 0,
      delivery: 25,
    }
    this.getBasket();
  }

  getCountItem(){
    return this.basket.shawas.length;
  }

  getBasket(){
    return this.basket;
  }

  


}