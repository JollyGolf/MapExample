import { Component, ViewChild, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { MapServiceService } from '../../map-service.service';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { ItemMapComponent } from 'src/app/components/item-map/item-map.component';
import { AlertService } from 'src/app/alert.service';
import { NavController } from '@ionic/angular';
import { OrderService } from 'src/app/services/order.service';
import { ProfileService, Eater } from 'src/app/services/profile.service';
declare var L: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(HeaderComponent, null) header: HeaderComponent;
  @ViewChild(ItemMapComponent, null) map: ItemMapComponent;
  errors: any;
  lat: any;
  long: any;
  // address: any = '';
  eater: Eater;
  geocoder = L.Control.Geocoder.nominatim();
  inputChangeFlag: boolean = false;
  constructor(
    private geolocation: Geolocation,
    private mapService: MapServiceService,
    private orderService: OrderService,
    private alertService: AlertService,
    private navCtrl: NavController,
    private profileService: ProfileService
  ) {}

  ngOnInit(){ this.header.setHeaderTitle('Шаг 2: Где ты?'); }

  ionViewWillEnter(){
    this.eater = this.profileService.getEater();
  }

  changeAddress(){
    if(this.inputChangeFlag) this.inputChangeFlag = false;
    else {
      this.mapService.getLatLngFromAddress(this.eater.address).then(address => {
        address && address[0] && address[0].y 
          ? this.map.setDefaultMarker(address[0].y, address[0].x) 
          : null;
      });
    }
  }

  setAddress($event){
    console.log('thiiiis', $event);
    this.inputChangeFlag = true;
    let address = this.mapService.checkAddressAtHouseNumber($event.address, null);
    if(address.status){
      if(address.status == 3) {
        this.alertService.showAlert(address.value,'Мы доставим твою шавуху прямо в точку на карте!');
        this.eater.address = 'Доставим прямо в точку на карте!';
      }
      else this.eater.address = address.value;
    }
    else {
      this.alertService.showAlert('Адрес не определился - но мы тебя найдем!','Мы доставим твою шавуху прямо в точку на карте!');
      this.address = 'Доставим прямо в точку на карте!';
    }
    // this.address = this.mapService.checkAddressAtHouseNumber($event.address, null);
    // console.log('checkAddress =>', this.mapService.checkAddressAtHouseNumber($event.address, null));
  }
  nextStep(){
    // console.log('nonLastMarker', this.mapService.getCurrentPosition());
    // console.log(this.mapService.getLastMarkerPosition());
    
    this.orderService.setGeoPoint(this.mapService.getLastMarkerPosition());
    this.navCtrl.navigateForward('menu/payment');
  }
}
