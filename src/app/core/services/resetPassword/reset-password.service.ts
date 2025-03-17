import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../../constant/baseURL';
import { Auth } from '../../../shared/interface/auth/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private HttpClient:HttpClient) { }

  verfyEmail(Payload:Auth):Observable<any>{
    return this.HttpClient.post(`${baseUrl.BaseUrl}/auth/forgotPasswords`,Payload)
  }

  verfyCode(Payload:Auth):Observable<any>{
    return this.HttpClient.post(`${baseUrl.BaseUrl}/auth/verifyResetCode`,Payload)
  }

  resetPassword(Payload:Auth):Observable<any>{
    return this.HttpClient.put(`${baseUrl.BaseUrl}/auth/resetPassword`,Payload)
  }
}
