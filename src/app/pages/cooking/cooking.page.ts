import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-cooking',
  templateUrl: './cooking.page.html',
  styleUrls: ['./cooking.page.scss'],
})
export class CookingPage implements OnInit {
  @ViewChild(HeaderComponent, null) header: HeaderComponent;
  constructor(private navCtrl: NavController) { }

  ngOnInit(){ this.header.setHeaderTitle(''); }

  nextStep(){
    this.navCtrl.navigateForward('menu/cooking');
  }

}
