import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
  noticias: Article[] = [];

  constructor(private storage: Storage) { }

  guardarNoticia(noticia: Article) {
    if (!this.noticias.find(not => not.title === noticia.title)) {
      this.noticias.unshift(noticia);
      this.storage.set('favoritos', this.noticias);
    }    
  }
}
