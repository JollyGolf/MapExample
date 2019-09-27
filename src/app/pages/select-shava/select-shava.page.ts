import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-select-shava', 
  templateUrl: './select-shava.page.html',
  styleUrls: ['./select-shava.page.scss'],
})
export class SelectShavaPage implements OnInit {
  @ViewChild(HeaderComponent, null) header: HeaderComponent;
  slideOpts = {
    initialSlide: 1,
    speed: 400 
  };
  counter: number = 1;
  oneOf: number = 50;
  price: number = this.oneOf * this.counter + 25;
  constructor(private navCtrl: NavController) { }

  ngOnInit() {
    this.header.setHeaderTitle('Шаг 1: Выбери');
  }

  ionViewWillEnter(){
    this.counter = 1;
    this.oneOf = 50;
    this.price = this.oneOf * this.counter + 25;
  }

  slideBack(){
    console.log('back', this);
  }

  slideForward(){
    console.log('forward');
  }

  slideTap(event){
    console.log(event);
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
  
  nextStep(){
    this.navCtrl.navigateForward('menu/repeat-message');
  }
}
