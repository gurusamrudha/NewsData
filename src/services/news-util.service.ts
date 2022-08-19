import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RawData } from 'src/models/news-item';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsUtilService {

  constructor(private http: HttpClient) {}

  public getAllData(lang: string, catagory: string): Observable<RawData> {
    let apiGenerate = environment.apiUrl;

    if(lang && catagory) {
      apiGenerate = `${apiGenerate}&language=${lang}&category=${catagory}`;
    } else if (lang && !catagory) {
      apiGenerate = `${apiGenerate}&language=${lang}`;
    } else if (!lang && catagory) {
      apiGenerate = `${apiGenerate}&category=${catagory}`;
    }
    return this.http.get<RawData>(apiGenerate);
  }
}
