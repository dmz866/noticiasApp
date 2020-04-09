import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from 'src/app/services/data-local.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent {
  @Input() noticiaIndex: number;
  @Input() noticia: Article;
  @Input() enFavoritos: boolean = false;
  
  constructor(private iab: InAppBrowser, private actionSheetCtrl: ActionSheetController,
              private socialSharing: SocialSharing, private dataLocalService: DataLocalService) 
              { }

  abrirNoticia() {
    const browser = this.iab.create(this.noticia.url, '_system');
  }

  async lanzarMenu() {
    let guardarBorrarBtn;

    if (this.enFavoritos) {
      guardarBorrarBtn = {
                          text: 'Borrar Favorito',
                          icon: 'trash',
                          cssClass: 'action-dark',
                          handler: () => {
                            this.dataLocalService.borrarNoticia(this.noticia);
                          }
                        };
    }
    else {
      guardarBorrarBtn = {
                            text: 'Favorito',
                            icon: 'star',
                            cssClass: 'action-dark',
                            handler: () => {
                              this.dataLocalService.guardarNoticia(this.noticia);
                            }
                          }
    }

    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [{
        text: 'Compartir',
        icon: 'share',
        cssClass: 'action-dark',
        handler: () => {
          this.socialSharing.share(this.noticia.title, this.noticia.source.name, '', this.noticia.url);
        }
      }, 
      guardarBorrarBtn, 
      {
        text: 'Cancelar',
        icon: 'close',
        cssClass: 'action-dark',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
}
