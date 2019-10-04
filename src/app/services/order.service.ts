import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { TrivialService } from './trivial.service';
import { Shawa, BasketService } from './basket.service';
import { NavController } from '@ionic/angular';

export interface Order {
    id_eaters: string,
    price: number,
    geopoing: number[],
    shawas: Shawa[],
    createAt: Date,
    date: Date,
    method: 'cash'|'banking',
    eater_phone: string,
    status: {
      paid: boolean,
      stage: 'new'|'cooking'|'delivering'|'finished'|'failed',
    }
  }

@Injectable({
  providedIn: 'root'
})

export class OrderService {
  orderCollection: AngularFirestoreCollection<Order>;
  order: Order = {
    id_eaters: '1CWZ47aPYC59JJ3J4nO8',
    geopoing: [],
    createAt: new Date,
    date: new Date,
    price: 0,
    method: 'cash',
    shawas: [],
    eater_phone: '+380123456789',
    status: {
      paid: false,
      stage: 'new'
    }
  }
  constructor(
    private trivial: TrivialService,
    private basket: BasketService,
    private afs: AngularFirestore,
    private navCtrl: NavController
  ){
    this.orderCollection = this.afs.collection<Order>('orders');
  }

  setGeoPoint(geopoint: any){
    localStorage.setItem('eater-geoposition', JSON.stringify({lat: geopoint[0], lng: geopoint[1]}));
    this.order.geopoing = [geopoint[0], geopoint[1]];
  }

  setDate(date: Date){
    this.order.date = date;
  }

  setShawasAndPrice(price: number, shawas: Shawa[]){
    this.order.price = price;
    this.order.shawas = shawas;
  }

  getOrder(){
    return this.order;
  }
  
  createOrder(data){
    let basket = this.basket.getBasket();
    this.order.method = data.method;
    // data.method == 'banking' ? this.order.status.paid = true : this.order.status.paid = false;
    this.order.status.paid = data.method == 'banking' ? true : false;
    this.order.createAt = new Date();
    this.order.price = basket.price;
    this.order.shawas = basket.shawas;
    console.log('order', this.order);
    this.addOrder(this.order)
      .then(event => {
        this.trivial.showToast('Ваша заявка создана! Ожидайте', 1500);
        this.navCtrl.navigateRoot('menu/select-shava');
        this.basket.clearBasket();
      })
      .catch(error => {
        this.trivial.showToast('К сожалению произошла ошибка, попробуйте еще раз', 1500); 
        localStorage.removeItem('eater-geoposition');
        this.navCtrl.navigateRoot('menu/basket');
      }); 
    this.order = {
      id_eaters: '1CWZ47aPYC59JJ3J4nO8',
      geopoing: [],
      createAt: new Date,
      date: new Date,
      price: 0,
      method: 'cash',
      shawas: [],
      eater_phone: '+380123456789',
      status: {
        paid: false,
        stage: 'new'
      }
    }    
  }

  addOrder(order: Order): Promise<DocumentReference> {
    return this.orderCollection.add(order);
  }
  getOrders(){
    // return this.orderCollection.ref.limit()
  }
  

}