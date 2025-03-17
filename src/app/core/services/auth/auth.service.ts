import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Auth } from '../../../shared/interface/auth/auth';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // userData:BehaviorSubject<null | JwtPayload> = new BehaviorSubject<null | JwtPayload>(null);

  constructor(private _http: HttpClient,@Inject(PLATFORM_ID) Id:object,private router:Router) {
    if (isPlatformBrowser(Id)) {
      if (localStorage.getItem('userToken') !== null) {
        this.decodeUserDara();
      }
      
    }
  }

  register(formData: Auth): Observable<any> {
    return this._http.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signup',
      formData
    );
  }

  login(formData: Auth) {
    return this._http.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signin',
      formData
    );
  }

  userData:WritableSignal<any> = signal(null)
  decodeUserDara() {
    const token = localStorage.getItem('userToken') || '';
    const decoded = jwtDecode(token);
    this.userData.set(decoded);
    console.log(this.userData);
  }

  logOut(){
    // remove token from localStorage
    localStorage.removeItem('userToken');
    // userData => null
    this.userData.set(null);
    // navigate to login
    this.router.navigate(['/login']);
  }
}
function Signal(arg0: null): WritableSignal<any> {
  throw new Error('Function not implemented.');
}

