import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { TrivialService } from './trivial.service';
import { Shawa, BasketService } from './basket.service';
import { NavController } from '@ionic/angular';
import { MapServiceService } from '../map-service.service';


export interface Eater {
    id: string,
    address: string,
    addressLatLng: number[],
    name: string,
    phone: string
}

@Injectable({
  providedIn: 'root'
})
  
export class ProfileService {
  eater: AngularFirestoreCollection<Eater>;
  eaterData: any;
  userId: string = '1CWZ47aPYC59JJ3J4nO8';
  constructor(
    private trivial: TrivialService,
    private basket: BasketService,
    private afs: AngularFirestore,
    private navCtrl: NavController,
    private map: MapServiceService
  ){
    this.eater = this.afs.collection<Eater>('eaters');
  }
  writeConsole(){
    this.eater.snapshotChanges().pipe(
      map(actions => actions.map(e => ({ id: e.payload.doc.id, ...e.payload.doc.data()})))
    ).subscribe(e => console.log('actions', e));
  }

  getEaterById(id: string){
    return this.eater.doc<Eater>(id).valueChanges().pipe(
      take(1), map(eater => ({ id, ...eater}))
    );
  }

  getEater(){
    return this.eaterData;
  }

  setEater(eater: Eater){
    this.eaterData = eater;
  }

  updateEater(eater: Eater){
    let {id, name, address, addressLatLng, phone} = eater;
    if(address == '' || name == '' || phone == ''){
      this.trivial.showToast('Поля не должны быть пустыми!', 1500);
    }
    else {
      this.map.getLatLngFromAddress(address)
        .then(e => {
          if(e.length == 0) this.trivial.showToast('Проблемы с расшифровкой адреса!', 1500);
          else {
            this.eater.doc<Eater>(id).update({ name, address, addressLatLng: [e[0].y, e[0].x], phone })
              .then(event => {
                  this.trivial.showToast('Данные сохранены', 1000);
                  this.map.setCurrentPosition(e[0].y, e[0].x);
              })
              .catch(e => this.trivial.showToast('Что-то пошло не так', 1000));
          }
        })
        .catch(e => this.trivial.showToast('Проблемы с расшифровкой адреса', 1000))
      
    }
  }
}