import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  signUp(body: { username: string; email: string; password: string }) {
    return this.httpClient.post('/api/1.0/users', body);
  }
}
