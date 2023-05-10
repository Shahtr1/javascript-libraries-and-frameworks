import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  signUp(
    body: Partial<{
      username: string | null;
      email: string | null;
      password: string | null;
    }>
  ) {
    return this.httpClient.post('/api/1.0/users', body);
  }
}
