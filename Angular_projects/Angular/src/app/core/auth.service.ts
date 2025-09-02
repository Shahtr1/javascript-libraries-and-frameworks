import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Role = 'user' | 'manager' | 'admin';

export interface User {
  id: number;
  name: string;
  roles: Role[];
  token?: string;
  refreshToken?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly user$ = new BehaviorSubject<User | null>({
    id: 1,
    name: 'Demo User',
    roles: ['user'],
    token: 't1',
    refreshToken: 'rt1',
  });

  currentUser$ = this.user$.asObservable();

  setRoles(roles: Role[]) {
    const u = this.user$.value;
    if (!u) return;
    this.user$.next({ ...u, roles });
  }

  setUser(u: User | null) {
    this.user$.next(u);
  }

  // mock “refresh token” call
  refresh(): Promise<string> {
    return new Promise((resolve) => setTimeout(() => resolve('t2'), 400));
  }

  snapshot(): User | null {
    return this.user$.value;
  }
}
