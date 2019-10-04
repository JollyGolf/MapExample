import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class TrivialService {
  constructor(private toastCtrl: ToastController){ }

  showToast(message: string, duration: number) {
    this.toastCtrl.create({
      message: message,
      duration
    }).then(toast => toast.present())
  }
}