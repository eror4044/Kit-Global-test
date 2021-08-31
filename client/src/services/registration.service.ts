import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>('/api/users');
  }

  create(user: User) {
    return this.http.post('/api/user/registration', user);
  }

  update(user: User) {
    return this.http.put('/api/users/' + user.id, user);
  }

  delete(id: number) {
    return this.http.delete('/api/user/registration' + id);
  }
}
