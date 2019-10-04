import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { NavController } from '@ionic/angular';
import { TrivialService } from 'src/app/services/trivial.service';
import { BasketService } from 'src/app/services/basket.service';
import { ProfileService, Eater } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  @ViewChild(HeaderComponent, null) header: HeaderComponent;
  profile: Eater;
  constructor(
    private navCtrl: NavController,
    private trivial: TrivialService,
    private basketService: BasketService,
    private profileService: ProfileService
  ) { }

  ngOnInit() {
    this.header.setHeaderTitle('Профиль');
    this.profileService.writeConsole();
    // this.profileService.getEaterById('1CWZ47aPYC59JJ3J4nO8').subscribe(e => {
    //   this.profile = { ...e }
    // });
  }
  ionViewWillEnter(){
    this.header.setCountBasketItem();
    this.profile = this.profileService.getEater();
  }

  saveData(){
    console.log(this.profile);
    this.profileService.updateEater(this.profile);
  }

}
