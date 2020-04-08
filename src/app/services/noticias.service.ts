import { Injectable, QueryList } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadLines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const apiKey = environment.apiKey;
const NEWS_API_URL = 'http://newsapi.org/v2/';
const headers = new HttpHeaders({ 'X-Api-key': apiKey});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {    

  constructor(private http: HttpClient) { }

  private getQuery<T>(query: string) {
    query = NEWS_API_URL + query;
    return this.http.get<T>(query, { headers });
  }
 
  getTopHeadLines() {
    return this.getQuery<RespuestaTopHeadLines>('top-headlines?country=us&category=business');
  }

  getTopHeadLinesByCategory(categoria: string) {
    return this.getQuery<RespuestaTopHeadLines>(`top-headlines?country=us&category=${categoria}`);
  }
}
