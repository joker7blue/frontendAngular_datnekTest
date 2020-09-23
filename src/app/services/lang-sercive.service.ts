import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Language from '../models/language';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LangSerciveService {

  base_api_url = 'http://localhost:5000/api/';

  constructor(private http: HttpClient) { }

  getAllLanguages (): Promise<Array<any>> {

    return new Promise((resolve, reject) => {
      this.http.get<any[]>(this.base_api_url+'langs').subscribe((response: any) => resolve(response.data),
      error => reject(error));
    })
  }

  addLang (lang) {
    return this.http.post(this.base_api_url+'langs', lang);
  }

  deleteLang (id) {
    return this.http.delete(this.base_api_url+'langs/'+id);
  }
}
