import { Injectable } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase';


@Injectable()
export class AuthService {

    authState: any = null;
    admins: any[] = []
    isAdmin: boolean;

    constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, private router: Router) {
        this.afAuth.authState
            .map(auth => auth)
            .subscribe(user => {
                this.authState = user

                this.db.list('/admin')
                    .map(state => state)
                    .subscribe(admins => {
                        admins.forEach(admin => {
                            if (user.uid === admin.$key) {
                                this.isAdmin = true
                            }
                        });
                    });
            });

    }

    get Admin(): boolean {
        return this.isAdmin
    }

    get authenticated(): boolean {
        return this.authState !== null;
    }

    get currentUser(): any {
        return this.authenticated ? this.authState : null;
    }

    get currentUserObservable(): any {
        return this.afAuth.authState
    }

    get currentUserId(): string {
        return this.authenticated ? this.authState.uid : '';
    }

    get currentUserDisplayName(): string {
        const path = `users/${this.currentUserId}`;

        this.db.object(path).subscribe(user => {
            this.authState.firstName = user.firstName
            this.authState.lastName = user.lastName
        });
        return this.authState.firstName + this.authState.lastName
    }

    emailSignUp(firstName: string, lastName: string, email: string, phone: string, password: string, address: string) {
        return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
            .then((user) => {
                this.authState = user

                this.authState.firstName = firstName
                this.authState.lastName = lastName
                this.authState.phone = phone
                this.authState.address = address

                this.updateUserData()
                this.router.navigate(['']);
                return undefined;
            })
            .catch(error => {
                return error;
            });
    }

    emailLogin(email: string, password: string) {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password)
            .then((user) => {
                this.authState = user
                this.router.navigate([''])
                return undefined;
            })
            .catch(error => {
                return error;
            });
    }

    signOut(): void {
        this.afAuth.auth.signOut();
        this.isAdmin = false
        this.router.navigate(['login'])
    }

    private updateUserData(): void {

        const path = `users/${this.currentUserId}`;
        const data = {
            email: this.authState.email,
            firstName: this.authState.firstName,
            lastName: this.authState.lastName,
            phone: this.authState.phone,
            address: this.authState.address,
            urlAddress: this.authState.firstName + this.authState.lastName
        }

        this.db.object(path).update(data)
            .catch(error => console.log(error));

    }

    readUserData(): any {

        const path = `users/${this.currentUserId}`;

        this.db.list('/users')


            .map((users) => (users))

            .subscribe(user => {

                user.forEach(element => {
                    if (element.$key === this.authState.uid) {
                        this.authState.firstName = element.firstName
                        this.authState.lastName = element.lastName
                        this.authState.phone = element.phone
                        this.authState.address = element.address
                        this.authState.urlAddress = element.urlAddress
                    }
                });
            });
    }

}
