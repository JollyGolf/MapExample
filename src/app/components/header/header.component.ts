import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router'
import { NavController } from '@ionic/angular';
import { BasketService } from 'src/app/services/basket.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {


  private title: string = '';
  private showMenu:boolean = true;
  private showBackButton: boolean = false;
  countBasketItem: number = 0;
  @Output() onBackButtonClick: EventEmitter<any> = new EventEmitter();

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private basket: BasketService
    ) { }

  ngOnInit() {
    this.countBasketItem = this.basket.getCountItem();
  }

  setHeaderTitle(title){
    this.title = title;
  }
  setCountBasketItem(){
    this.countBasketItem = this.basket.getCountItem();
  }
  hideMenu(){
    this.showMenu = false;
  }
  showBack(){
    this.showBackButton = true;
  }
  goBack(){
    this.router.url == '/menu/order-info' ? this.onBackButtonClick.emit() : this.navCtrl.back();
  }
  openBasket(){
    this.navCtrl.navigateForward('menu/basket');
  }
}
