import { Component, ViewChild, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { MapServiceService } from '../../map-service.service';
import { HeaderComponent } from 'src/app/components/header/header.component';

declare var L: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(HeaderComponent, null) header: HeaderComponent;
  errors: any;
  lat: any;
  long: any;
  address: any = "fsafasd";
  geocoder = L.Control.Geocoder.nominatim();
  constructor(
    private geolocation: Geolocation,
    private mapService: MapServiceService
  ) {}

  ngOnInit(){ 
    this.header.setHeaderTitle('Шаг 2: Где ты?');
    console.log(this.mapService.getCurrentPosition());
  }

  // setAddress() {
  //   this.geocoder.reverse({lat: lat, lng: long}, 13, r => {
  //     this.address = this.checkAddressAtHouseNumber(r[0], unicName);
  //   });
  // }
}
