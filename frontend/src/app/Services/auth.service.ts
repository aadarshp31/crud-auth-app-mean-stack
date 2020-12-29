import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url: string = environment.url

  constructor(private http: HttpClient) { }

  signin(email: string, password: string) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    let body = { email, password }
    return this.http.post(this.url + '/signin', JSON.stringify(body), httpOptions)
  }

  signup(userData) {
    let headers: any = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    let body = userData
    return this.http.post(this.url, body, headers)
  }
}
