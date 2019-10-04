import { Injectable } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private alertController: AlertController,
  ) { }

  async showExitAlert(title, message){
    const alert = await this.alertController.create({
      header: title,
      subHeader: message,
      buttons: [
        {
          text: 'ДА',
          cssClass: 'secondary',
          handler: () => {
            navigator['app'].exitApp();
            console.log('exit');
          }
        }, {
          text: 'ОСТАТЬСЯ',
          role: 'cancel',
          handler: () => {
            console.log('stay');
          }
        }
      ],
    });
    await alert.present();
  }
  async showAlert(title, message){
    const alert = await this.alertController.create({
      header: title,
      subHeader: message,
      buttons: ['OK']
    });
    await alert.present();
  }
  // async showCancelOrderAlert(title, message, callback){
  //   const alert = await this.alertController.create({
  //     header: title,
  //     subHeader: message,
  //     buttons: [
  //       {
  //         text: 'ДА',
  //         cssClass: 'secondary',
  //         handler: () => callback()
  //       }, {
  //         text: 'НЕТ',
  //         role: 'cancel',
  //         handler: () => console.log('stay')
  //       }
  //     ],
  //   });
  //   await alert.present();
  // }
}
