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

    // Anonymous User
    get currentUserAnonymous(): boolean {
        return this.authenticated ? this.authState.isAnonymous : false
    }

    // Returns current user display name or Guest
    get currentUserDisplayName(): string {
        if (!this.authState) {
            return 'Guest'
        } else if (this.currentUserAnonymous) {
            return 'Anonymous'
        } else {
            return this.authState['displayName'] || 'User without a Name'
        }
    }

    //// Email/Password Auth ////

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
                this.router.navigate([''])
            })
            .catch(error => {
                const errorMessage = error.message;
                alert(errorMessage);
                console.log(error);
            });
    }

    // Sends email allowing user to reset password
    resetPassword(email: string) {
        const auth = firebase.auth();

        return auth.sendPasswordResetEmail(email)
            .then(() => console.log('email sent'))
            .catch((error) => console.log(error))
    }


    //// Sign Out ////

    signOut(): void {
        this.afAuth.auth.signOut();
        this.router.navigate(['login'])
    }


    //// Helpers ////

    private updateUserData(): void {
        // Writes user name and email to realtime db
        // useful if your app displays information about users or for admin features

        const path = `users/${this.currentUserId}`; // Endpoint on firebase
        const data = {
            email: this.authState.email,
            firstName: this.authState.firstName,
            lastName: this.authState.lastName,
            phone: this.authState.phone,
            address: this.authState.address
        }

        this.db.object(path).update(data)
            .catch(error => console.log(error));

    }
}
