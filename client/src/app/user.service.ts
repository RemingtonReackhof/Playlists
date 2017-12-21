import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import {environment} from '../environments/environment';

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  getUser(): Promise<any> {
    const url = environment.apiUrl + 'user';
    return this.http.get(url)
      .toPromise()
      .then(response => console.log(response.json()))
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
