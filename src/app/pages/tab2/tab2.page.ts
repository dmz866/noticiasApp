import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from 'src/app/services/noticias.service';
import { Article } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  @ViewChild('segment', {static: true}) segment: IonSegment;
  categorias = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  noticias: Article[] = [];
  
  constructor(private noticiasService: NoticiasService) {}

  ngOnInit() {
    this.segment.value = this.categorias[0];
    this.getNoticiasByCategoria(this.categorias[0]);
  }

  cambioCategoria(event) {
    this.noticias = [];
    this.getNoticiasByCategoria(event.detail.value);
  }

  loadData(event) {
    this.getNoticiasByCategoria(this.segment.value, event);
  }

  getNoticiasByCategoria(categoria: string, event?) {
    this.noticiasService.getTopHeadLinesByCategory(categoria).subscribe(result => 
    {
      if (event) {
        event.target.complete();
        return;
      }

      this.noticias.push(...result.articles);
    });
  }
}
