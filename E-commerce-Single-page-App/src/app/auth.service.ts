import { Injectable } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase';


@Injectable()
export class AuthService {

    authState: any = null;

    constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, private router: Router) {
        this.afAuth.authState.subscribe((auth) => {
            this.authState = auth
        });
    }

    // Returns true if user is logged in
    get authenticated(): boolean {
        return this.authState !== null;
    }

    isAdmin() {

    }

    // Returns current user data
    get currentUser(): any {
        return this.authenticated ? this.authState : null;
    }

    // Returns
    get currentUserObservable(): any {
        return this.afAuth.authState
    }

    // Returns current user UID
    get currentUserId(): string {
        return this.authenticated ? this.authState.uid : '';
    }

    // Returns current user display name or Guest
    get currentUserDisplayName(): string {
        const path = `users/${this.currentUserId}`;

        this.db.object(path).subscribe(user => {
            this.authState.firstName = user.firstName
            this.authState.lastName = user.lastName
        });
        return this.authState.firstName + this.authState.lastName
    }

    // Email/Password Auth

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
            })
            .catch(error => {
                const errorMessage = error.message;
                alert(errorMessage);
                console.log(error);
            });
    }

    emailLogin(email: string, password: string) {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password)
            .then((user) => {
                this.authState = user
                this.readUserData()
                this.router.navigate([''])
            })
            .catch(error => {
                const errorMessage = error.message;
                alert(errorMessage);
                console.log(error);
            });
    }

    // resetPassword(email: string) {
    //     const auth = firebase.auth();

    //     return auth.sendPasswordResetEmail(email)
    //         .then(() => console.log('email sent'))
    //         .catch((error) => console.log(error))
    // }

    // Sign Out

    signOut(): void {
        this.afAuth.auth.signOut();
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

    private readUserData(): void {

        const path = `users/${this.currentUserId}`;

        this.db.object(path).subscribe(user => {
            this.authState.firstName = user.firstName
            this.authState.lastName = user.lastName
            this.authState.phone = user.phone
            this.authState.address = user.address
            this.authState.urlAddress = user.urlAddress
        });
    }

}
