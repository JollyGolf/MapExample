import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { MapServiceService} from '../../map-service.service';

declare var L: any;

@Component({
  selector: 'item-map',
  templateUrl: './item-map.component.html',
  styleUrls: ['./item-map.component.scss'],
})
export class ItemMapComponent implements OnInit {

  @ViewChild("map", null) mapElement: ElementRef;
  @Input() appId: any;
  @Input() appCode: any;
  @Input() lat: any;
  @Input() lng: any;
  map: any;

  iconDefault: any;
  iconSelf: any;
  iconStrange: any;
  markerList = {};
  constructor(
    private mapService: MapServiceService
  ) { }

  ngOnInit() { 
    this.map = this.mapService.createMap(this.mapElement);
    this.iconDefault = this.mapService.setDefaultIcon('blue', 42, 68);
    this.iconSelf = this.mapService.setDefaultIcon('red', 42, 68);
    this.iconStrange = this.mapService.setDefaultIcon('green', 42, 68);
    navigator.geolocation.getCurrentPosition(
      p => {
        this.lat = p.coords.latitude;
        this.lng = p.coords.longitude;
        this.mapService.addMarker(this.iconSelf, this.map, 'default-icon', 'Ты тут!', p.coords.latitude, p.coords.longitude, 'default', this.markerList);
      }, e => console.log('error', e)
    );
    // >< //
  }

  ngAfterViewInit() {
    // this.mapService.addMarker(this.iconDefault, this.map, 'royal-icon', 'Royal шава!', 50.9095286, 34.7955582 , 'default', this.markerList);
    // this.mapService.addMarker(this.iconDefault, this.map, 'antaliya-icon', 'Анталия (тут лучше не брать)', 50.9093807, 34.7956303 , 'default', this.markerList);
    // this.mapService.addMarker(this.iconStrange, this.map, 'freshline-icon', 'Fresh shava', 50.91424533346864, 34.81000416551569 , 'default', this.markerList);
    this.mapService.addControl(this.map, 'ion-icon', 'ios-compass', '#cd3147', '#353535', 'bottomleft', '50', '50', () => this.setCurrentPostionEvent());
    this.mapService.addControl(this.map, 'ion-icon', 'ios-checkbox', '#38b82f', '#353535', 'bottomleft', '50', '50', () => this.getAddressFromCurrentPosition());
    setTimeout(() => this.map.invalidateSize(), 1000);
  }

  setCurrentPostionEvent(){
    navigator.geolocation.getCurrentPosition( p => {
      this.markerList['default-icon'] ? this.mapService.removeMarker(this.map, this.markerList['default-icon'], 'default-icon', this.markerList) : null;
      this.mapService.addMarker(this.iconSelf, this.map, 'default-icon', 'Ты снова тут!', p.coords.latitude, p.coords.longitude, 'default', this.markerList);
      this.map.flyTo([p.coords.latitude, p.coords.longitude], 17);      
    }, e => console.log(e));
  }

  getAddressFromCurrentPosition(){
    console.log(this.mapService.getCurrentPosition());
  }
}




    // const geocoder = L.Control.Geocoder.nominatim();

    // let marker;
    // this.map.on('click', e => {
    //   console.log('e', e);
    //   geocoder.reverse(e.latlng, this.map.options.crs.scale(this.map.getZoom()), results => {
    //     let r = results[0];
    //     if (r) {
    //       console.log('address', r);
    //       if (marker) marker.setLatLng(r.center).setPopupContent(r.html || r.name).openPopup();
    //       else marker = L.marker(r.center).bindPopup(r.name).addTo(this.map).openPopup();
    //     }
    //   });
    // }, e => console.log('/////', e));