import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { MapServiceService} from '../../map-service.service';

declare var L: any;

@Component({
  selector: 'item-map',
  templateUrl: './item-map.component.html',
  styleUrls: ['./item-map.component.scss'],
})
export class ItemMapComponent implements OnInit {

  @ViewChild("map", null) mapElement: ElementRef;
  @Output() addressEvent = new EventEmitter<any>();
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
    let coords = this.mapService.getLastMarkerPosition();
    if(coords[0] && coords[1]){
      this.mapService.addMarker(this.iconSelf, this.map, 'default-icon', 'Ты тут!', coords[0] , coords[1], 'default', this.markerList);
    }
    else {
      navigator.geolocation.getCurrentPosition(
        p => {
          this.lat = p.coords.latitude;
          this.lng = p.coords.longitude;
          this.mapService.addMarker(this.iconSelf, this.map, 'default-icon', 'Ты тут!', p.coords.latitude, p.coords.longitude, 'default', this.markerList);
        }, e => console.log('error', e)
      );
    }
    

    // >< //
  }

  ngAfterViewInit() {
    this.mapService.addControl(this.map, 'ion-icon', 'ios-compass', '#cd3147', '#353535', 'bottomleft', '50', '50', () => this.setCurrentPostionEvent());
    this.mapService.addControl(this.map, 'ion-icon', 'ios-checkbox', '#38b82f', '#353535', 'bottomleft', '50', '50', () => this.getAddressFromCurrentPosition());
    setTimeout(() => this.map.invalidateSize(), 1000);
  }

  setCurrentPostionEvent(){
    navigator.geolocation.getCurrentPosition( p => this.setDefaultMarker(p.coords.latitude, p.coords.longitude), e => console.log(e));
  }

  setDefaultMarker(lat, lng){
    this.markerList['default-icon'] ? this.mapService.removeMarker(this.map, this.markerList['default-icon'], 'default-icon', this.markerList) : null;
    this.mapService.addMarker(this.iconSelf, this.map, 'default-icon', 'Ты снова тут!', lat, lng, 'default', this.markerList);
    this.map.flyTo([lat, lng], 17);  
  }

  getAddressFromCurrentPosition(){ 
    this.addressEvent.emit(this.mapService.getCurrentPosition());
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