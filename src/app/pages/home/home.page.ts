import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { MapServiceService } from '../../map-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  // map: Map;
  errors: any;
  lat: any;
  long: any;
  constructor(
    private geolocation: Geolocation,
    private map: MapServiceService
  ) {}

  ngOnInit(){}
}
