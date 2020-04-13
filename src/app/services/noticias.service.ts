import { Injectable, QueryList } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadLines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const apiKey = environment.apiKey;
const NEWS_API_URL = 'https://newsapi.org/v2/';
const headers = new HttpHeaders({ 'X-Api-key': apiKey});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {    
  headLinesPage = 0;
  categoriaActual = '';
  categoriaActualPage = 0;

  constructor(private http: HttpClient) { }

  private getQuery<T>(query: string) {
    query = NEWS_API_URL + query;
    return this.http.get<T>(query, { headers });
  }
 
  getTopHeadLines() {
    this.headLinesPage++;
    return this.getQuery<RespuestaTopHeadLines>(`top-headlines?country=us&category=business&page=${this.headLinesPage}`);
  }

  getTopHeadLinesByCategory(categoria: string) {

    if (this.categoriaActual === categoria) {
      this.categoriaActualPage++;
    }
    else {
      this.categoriaActualPage = 0;
    }

    return this.getQuery<RespuestaTopHeadLines>(`top-headlines?country=us&category=${categoria}&page=${this.categoriaActualPage}`);
  }
}
