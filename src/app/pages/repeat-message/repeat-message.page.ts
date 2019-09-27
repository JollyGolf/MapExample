import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-repeat-message',
  templateUrl: './repeat-message.page.html',
  styleUrls: ['./repeat-message.page.scss'],
})
export class RepeatMessagePage implements OnInit {
  @ViewChild(HeaderComponent, null) header: HeaderComponent;
  constructor(private navCtrl: NavController) { }

  ngOnInit() {
    this.header.setHeaderTitle('Шаг 1: Выбери');
  }

  nextStep(){
    this.navCtrl.navigateForward('menu/home');
  }
  prevStep(){
    this.navCtrl.navigateForward('menu/select-shava');
  }

}
