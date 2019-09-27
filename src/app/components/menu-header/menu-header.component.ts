import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { AlertService } from 'src/app/services/alert.service';
import { Events, NavController } from '@ionic/angular';


@Component({
  selector: 'menu-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.scss'],
})
export class MenuHeaderComponent implements OnInit {

  // data: any = {
  //   phone: '',
  //   avatar: ''
  // };

  constructor(
              // private alertProv: AlertService,
              private router: Router,
              private event: Events,
              private navCtrl: NavController) { }

  ngOnInit() {
    // this.setHeaderInfo();
    // this.event.subscribe('edit_user', () => { this.setHeaderInfo() });
  }
  // setHeaderInfo(){
  //   let temp = JSON.parse(localStorage.getItem("clientInfo"));
  //   if(temp && temp.user){
  //     this.data.avatar = temp.user.avatar;
  //     this.data.phone = temp.user.phone;
  //   } else {
  //     this.alertProv.showAlert('Проблема!','Данных о пользователе не существует. Необходимо пройти аутентификацию еще раз.');
  //     localStorage.removeItem("driverInfo");
  //     this.navCtrl.navigateForward('login');
  //   }
  // }
}
