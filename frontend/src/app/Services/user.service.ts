import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  api: string = 'http://localhost:5000/users'

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(this.api);
  }
  getUser(id: string) {
    let link: string = this.api + '/' + id
    return this.http.get(link);
  }
  addUser(id: string, data: any) {
    let link: string = this.api + '/' + id
    return this.http.post(link, data);
  }
  updateUser(id: string, data: any) {
    let link: string = this.api + '/' + id
    return this.http.put(link, data);
  }
  deleteUser(id: string) {
    let link: string = this.api + '/' + id
    return this.http.delete(link);
  }
}
