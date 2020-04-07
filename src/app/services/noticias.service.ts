import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespuestaTopHeadLines } from '../interfaces/interfaces'
@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor(private http: HttpClient) { }

  getTopHeadLines() {
    return this.http.get<RespuestaTopHeadLines>('http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=3993dc1a5c854071b3e930ce059877f1');
  }
}
