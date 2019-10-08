import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const USER_KEY = 'user';
const LOGIN_PATH = `${environment.BASE_API_PATH}/api/login`;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticationState = new BehaviorSubject(false);

  constructor(private storage: Storage, private plt: Platform, private http: HttpClient) {
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  checkToken() {
    this.storage.get(USER_KEY).then(res => {
      if (res) {
        this.authenticationState.next(true);
      }
    })
  }

  getToken(): Promise<any> {
    return this.storage.get(USER_KEY).then(user => {
      if (user) {
        return JSON.parse(user);
      }
    })
  }

  login(email: string, password: string) {
    return this.http.post(LOGIN_PATH, { email: email, password: password }, {}).subscribe(async (res: any) => {
      if (res.user.email) {
        await this.storage.set(USER_KEY, JSON.stringify(res.user)).then(() => {
          this.authenticationState.next(true);
        });
      }
      else {
        this.authenticationState.next(false);
      }
    });
  }

  logout() {
    return this.storage.remove(USER_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

}