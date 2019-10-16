import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private afAuth: AngularFireAuth) { }

  registerUser(value): Promise<any>{
    return this.afAuth.auth.createUserWithEmailAndPassword(value.email, value.password);
  }
  
  loginUser(value): Promise<any>{
    
    return this.afAuth.auth.signInWithEmailAndPassword(value.email, value.password);
  }

  logoutUser(): Promise<void>{
    return this.afAuth.auth.signOut();
  }

  isAuthenticated(): boolean {
    console.log(firebase.auth().currentUser);
    return firebase.auth().currentUser !== null;
  }
  userDetails(){
    return firebase.auth().currentUser;
  }
}
