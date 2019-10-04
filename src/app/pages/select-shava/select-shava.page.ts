import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { NavController, ToastController, IonSlides } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { FirebaseService, Shawarma } from 'src/app/services/firebase.service';
import { TrivialService } from 'src/app/services/trivial.service';
import { BasketService } from 'src/app/services/basket.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-select-shava', 
  templateUrl: './select-shava.page.html',
  styleUrls: ['./select-shava.page.scss'],
})
export class SelectShavaPage implements OnInit {
  
  @ViewChild(HeaderComponent, null) header: HeaderComponent;
  @ViewChild(IonSlides, null) slides: IonSlides;
  initialIndex: number = 0;
  activeIndex: number;
  finalIndex: number;
  shawas: Shawarma[];
  slideOpts = {
    initialSlide: this.initialIndex,
    speed: 400 
  };
  counter: number = 1;
  oneOf: number;
  price: number;
  firebaseSubscription: Subscription;

  constructor(
    private navCtrl: NavController,
    private firebase: FirebaseService,
    private toastCtrl: ToastController,
    private trivial: TrivialService,
    private basket: BasketService,
    private profileService: ProfileService
  ) { }

  ngOnInit() {
    console.log('ngOnInit');
    this.header.setHeaderTitle('Шаг 1: Выбери');
    this.profileService.getEaterById('1CWZ47aPYC59JJ3J4nO8').subscribe(e => this.profileService.setEater(e));
  }

  ionViewWillEnter(){
    console.log('ionViewWillEnter');
    localStorage.removeItem('eater-geoposition');
    this.counter = 1;
    this.getShawas();
    this.header.setCountBasketItem();
  }

  getShawas(){
    this.firebaseSubscription = this.firebase.getShawas().subscribe(items => {
      this.shawas = items;
      this.trivial.showToast('Данные с firebase получены.', 1000);
      console.log('Get shawas =>', items);
      this.changeFinnalyCost(this.shawas[this.initialIndex].price, this.shawas[this.initialIndex].price * this.counter + 25);
      this.finalIndex = this.shawas.length-1;
      this.slides.getActiveIndex().then(index => this.activeIndex = index);
    });
  }

  slideChanged(){
    this.slides.getActiveIndex().then(index => {
      this.changeFinnalyCost(this.shawas[index].price, this.shawas[index].price * this.counter + 25);
      this.activeIndex = index;
    })
  }

  changeFinnalyCost(oneOf, price){
    this.oneOf = oneOf;
    this.price = price;
  }

  generateCount(type: '+'|'-'){
    if(type == '+') {
      this.counter++;
      this.price = this.oneOf * this.counter + 25;
    } 
    else if(type == '-'){
      if (this.counter == 0) return;
      this.counter--;
      this.price = this.counter ? this.oneOf * this.counter + 25 : 0;
    }
  }
  slideTap(){ }
  slideBack(){
    if(this.activeIndex > this.initialIndex){
      this.slides.slideTo(this.activeIndex - 1);
    }
    else if(this.activeIndex == this.initialIndex){
      this.trivial.showToast('Это и так самый первый слайд!', 1000);
    }
  }
  slideForward(){
    if(this.activeIndex < this.finalIndex){
      this.slides.slideTo(this.activeIndex + 1);
    }
    else if(this.activeIndex == this.finalIndex){
      this.trivial.showToast('Это уже самый последний слайд!', 1000);
    }
  }
  
  nextStep(){
    let {id, name, price} = this.shawas[this.activeIndex];
    this.basket.addItem({
      id,
      name,
      price,
      count: this.counter
    });
    this.header.setCountBasketItem();
    this.navCtrl.navigateForward('menu/repeat-message');
  }

  ionViewDidLeave(){
    this.firebaseSubscription.unsubscribe();
  }

}
