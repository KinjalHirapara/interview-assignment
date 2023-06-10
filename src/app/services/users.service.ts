import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { User } from '../interface/user.interface';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpService: HttpService) { }

  getAllUser(): Observable<User[]>{
    return this.httpService.get(`users`) as Observable<User[]>;
  }

  getUser(userId: number) {
    return this.httpService.get(`users/${userId}`);
  }

  createUser(user: User) {
    return this.httpService.post('users', user);
  }

  deleteUser(userId: string) {
    return this.httpService.delete(`users/${userId}`);
  }


}
