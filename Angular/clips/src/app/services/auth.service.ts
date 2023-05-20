import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import IUser from '../models/user.model';
import { delay, filter, map, Observable, of, switchMap } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usersCollection: AngularFirestoreCollection<IUser>;
  public isAuthenticated$: Observable<boolean>;
  public isAuthenticatedWithDelay$: Observable<boolean>;

  public redirect = false;

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.usersCollection = db.collection('users');
    this.isAuthenticated$ = auth.user.pipe(map((user) => !!user));
    this.isAuthenticatedWithDelay$ = this.isAuthenticated$.pipe(delay(1000));

    // // we don't get the manage data here, if we go on manage link,
    // for that we need a layer
    // the router doesn't provide us with data from the route, as service is outside the router-outlet directive
    //  so we listen to router events now
    // this.route.data.subscribe(console.log);

    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        map((e) => this.route.firstChild),
        switchMap((route) => route?.data ?? of({ authOnly: false }))
      )
      .subscribe((data) => (this.redirect = data.authOnly ?? false));
  }

  public async createUser(userData: IUser) {
    if (!userData.password) {
      throw new Error('Password not provided');
    }
    const userCred = await this.auth.createUserWithEmailAndPassword(
      userData.email as string,
      userData.password as string
    );

    if (!userCred.user) {
      throw new Error("User can't be found");
    }
    await this.usersCollection.doc(userCred.user?.uid).set({
      name: userData.name,
      email: userData.email,
      age: userData.age,
      phoneNumber: userData.phoneNumber,
    });

    await userCred.user.updateProfile({
      displayName: userData.name,
    });
  }

  public async logout($event?: Event) {
    if ($event) $event.preventDefault();
    await this.auth.signOut();
    if (this.redirect) await this.router.navigateByUrl('/');
  }
}
