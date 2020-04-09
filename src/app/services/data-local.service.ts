import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
  noticias: Article[] = [];

  constructor(private storage: Storage, private toastController: ToastController) { 
    this.cargarFavoritos();
  }

  guardarNoticia(noticia: Article) {
    if (!this.noticias.find(not => not.title === noticia.title)) {
      this.noticias.unshift(noticia);
      this.storage.set('favoritos', this.noticias);
      this.presentToast('Noticia agregada a Favoritos');
    }    
  }

  async cargarFavoritos() {
    const favoritos = await this.storage.get('favoritos');

    if (favoritos) {
      this.noticias = favoritos;
    }
  }

  borrarNoticia(noticia: Article) {
    this.noticias = this.noticias.filter(not => not.title !== noticia.title);
    this.storage.set('favoritos', this.noticias); 
    this.presentToast('Noticia borrada de Favoritos');
  }

  async presentToast(mess: string) {
    const toast = await this.toastController.create({
      message:  mess,
      duration: 2000
    });
    toast.present();
  }
}
