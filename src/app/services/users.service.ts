import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

interface Record {
  id: number,
  userName: string;
  phoneNumber: number;
  emailID: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpService: HttpService) { }

  getAllUser(users: Record[]) {
    this.httpService.get(`users/${users}`);
  }

  getUser(userId: number) {
    return this.httpService.get(`users/${userId}`);
  }

  createUser(user: Record) {
    return this.httpService.post('users', user);
  }

  deleteUser(userId: number) {
    return this.httpService.delete(`users/${userId}`);
  }
}
