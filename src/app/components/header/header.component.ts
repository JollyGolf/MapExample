import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router'
import { NavController } from '@ionic/angular';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {


  private title: string = '';
  private showMenu:boolean = true;
  private showBackButton: boolean = false;
  @Output() onBackButtonClick: EventEmitter<any> = new EventEmitter();

  constructor(
    private router: Router,
    private navCtrl: NavController
    ) { }

  ngOnInit() {}

  setHeaderTitle(title){
    this.title = title;
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
}
