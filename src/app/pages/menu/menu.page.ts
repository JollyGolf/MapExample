import { Component, OnInit, ViewChild } from '@angular/core';
// import { MenuHeaderComponent } from 'src/app/components/menu-header/menu-header.component';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { MapServiceService } from '../../map-service.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  // @ViewChild(MenuHeaderComponent) header: MenuHeaderComponent;

  constructor(
    private splashScreen: SplashScreen,
    private mapService: MapServiceService
  ) { }

  ngOnInit() {
    this.splashScreen.hide();
    navigator.geolocation.getCurrentPosition(
      p => {
        this.mapService.setCurrentPosition(p.coords.latitude, p.coords.longitude);
      },
      e => {
        console.log('error', e);
      }
    );
  }


}
