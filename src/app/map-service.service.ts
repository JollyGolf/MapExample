import { Injectable, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare var L: any;

@Injectable({
  providedIn: 'root'
})
export class MapServiceService {
  constructor() { }
  currentPosition: any;
  geocoder = L.Control.Geocoder.nominatim();

  createMap(mapElement: any){
    return L.map(mapElement.nativeElement, {
      center: [50.9, 34.8],
      zoom: 13,        
      layers: [L.tileLayer("http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}")],
      zoomControl: true
    });
  }

  setDefaultIcon(name: string, width: number, height: number){
    return L.icon({
      iconUrl: `https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${name}.png`,
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [width, height],
      iconAnchor: [width/2, height],
      popupAnchor: [1, -34],
     shadowSize: [height, height]
    });
  }

  addMarker(iconDefault: any, map: any, unicName: string, message: any, lat: number, long: number, icon: string, markerList){
    let marker = L.marker([lat, long], {icon: icon == 'default' ? iconDefault : null, draggable: unicName == 'default-icon' ? 'true' : null});
    markerList && markerList[unicName] ? this.removeMarker(map, marker, unicName, markerList) : null;
    markerList[unicName] = marker;
    marker.on('moveend', () => {
      let coords = marker.getLatLng();
      this.geocoder.reverse({lat: coords.lat, lng: coords.lng}, 13, r => {
        marker.bindPopup(this.checkAddressAtHouseNumber(r[0], unicName));
        map.flyTo([coords.lat, coords.lng], 17);
        unicName == 'default-icon' 
          ? this.currentPosition = {
            lat: r[0].center.lat, 
            long: r[0].center.lng, 
            address: r[0]} 
          : null;
      });
    });
    this.geocoder.reverse({lat: lat, lng: long}, 13, r => {
      map.addLayer(markerList[unicName].bindPopup(this.checkAddressAtHouseNumber(r[0], unicName)));
      unicName == 'default-icon' ? this.currentPosition = {lat, long, address: r[0]} : null;
    });
    return {map, markerList}
  }
  // getAddressBeCoords(map, lat, long, unicName){
  //   this.geocoder.reverse({lat: lat, lng: long}, 13, r => {
  //     map.addLayer(markerList[unicName].bindPopup( unicName == 'default-icon' ? 'Доставим сюда - '+r[0].name.split('Сумы')[0] + 'Сумы' : r[0].name.split('Сумы')[0] + 'Сумы')) 
  //     console.log('result service', r);
  //   });
  // }

  checkAddressAtHouseNumber(add: any, unicName: string){
    if (add.properties.address['house_number']) return `Доставим сюда - ${add.properties.address.road}, ${add.properties.address.house_number}, ${add.properties.address.city}`
    else {
      if (add.name.split('Сумы')[0] == '') return `Адресс не определился, но мы доставим прямо в эту точку!`;
      else return `Доставим сюда - ${add.name.split('Сумы')[0]} Сумы`;
    } 
  }

  removeMarker(map: any, marker: any, unicName: string, markerList){
    delete markerList[unicName];
    map.removeLayer(marker);
    return {map, markerList}
  }

  addControl(map, element: string, nameIcon: string, color: string, bgColor: string, position, w: string, h: string, controlCallback){
    let iconElement = document.createElement(element);
    iconElement.setAttribute('name', nameIcon);
    iconElement.setAttribute("style", `width: 100%; height: 100%; color: ${color}; background: ${bgColor}`);

    let control = L.Control.extend({ options: { position: position},
      onAdd: map => {
        var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
        container.setAttribute("style", `background-color: white; width: ${w}px; height: ${h}px;`);
        container.appendChild(iconElement);
        container.onclick = () => controlCallback();
        return container;
      }
    });
    map.addControl(new control());
    return {map}
  }

  getCurrentPosition(){
    return this.currentPosition;
  }
}
